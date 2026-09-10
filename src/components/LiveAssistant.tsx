import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';

const LiveAssistant: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [status, setStatus] = useState("Ready");
    const [error, setError] = useState<string | null>(null);
    const [volume, setVolume] = useState(0);

    // Refs for audio handling
    const audioContextRef = useRef<AudioContext | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const sessionRef = useRef<any>(null);

    // --- AUDIO UTILS ---
    const encode = (bytes: Uint8Array) => {
        let binary = '';
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };

    const decode = (base64: string) => {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    };

    const decodeAudioData = async (
        data: Uint8Array,
        ctx: AudioContext,
        sampleRate: number,
        numChannels: number,
    ): Promise<AudioBuffer> => {
        const dataInt16 = new Int16Array(data.buffer);
        const frameCount = dataInt16.length / numChannels;
        const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

        for (let channel = 0; channel < numChannels; channel++) {
            const channelData = buffer.getChannelData(channel);
            for (let i = 0; i < frameCount; i++) {
                channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
            }
        }
        return buffer;
    };

    const createBlob = (data: Float32Array) => {
        const l = data.length;
        const int16 = new Int16Array(l);
        for (let i = 0; i < l; i++) {
            int16[i] = data[i] * 32768;
        }
        return {
            data: encode(new Uint8Array(int16.buffer)),
            mimeType: 'audio/pcm;rate=16000',
        };
    };

    // --- SESSION CONTROL ---
    const startSession = async () => {
        setError(null);
        setStatus("Connecting...");
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Setup Audio Contexts
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const inputCtx = new AudioContextClass({ sampleRate: 16000 });
            const outputCtx = new AudioContextClass({ sampleRate: 24000 });
            audioContextRef.current = outputCtx; // Use output ctx for timing

            // Get Mic Stream
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;

            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-12-2025',
                callbacks: {
                    onopen: () => {
                        setStatus("Listening");
                        setIsActive(true);

                        // Setup Input Streaming
                        const source = inputCtx.createMediaStreamSource(stream);
                        const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
                        processorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (e) => {
                            const inputData = e.inputBuffer.getChannelData(0);
                            
                            // Visualizer mock
                            let sum = 0;
                            for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
                            setVolume(Math.sqrt(sum / inputData.length) * 5); // Amplify for visual

                            const pcmBlob = createBlob(inputData);
                            sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
                        };

                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputCtx.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                        
                        if (base64Audio) {
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                            
                            const audioBuffer = await decodeAudioData(
                                decode(base64Audio),
                                outputCtx,
                                24000,
                                1
                            );

                            const source = outputCtx.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputCtx.destination);
                            
                            source.addEventListener('ended', () => {
                                sourcesRef.current.delete(source);
                            });

                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            sourcesRef.current.add(source);
                        }

                        if (message.serverContent?.interrupted) {
                            sourcesRef.current.forEach(src => src.stop());
                            sourcesRef.current.clear();
                            nextStartTimeRef.current = 0;
                        }
                    },
                    onclose: () => {
                        setStatus("Disconnected");
                        setIsActive(false);
                    },
                    onerror: (e) => {
                        console.error(e);
                        setError("Connection error");
                        stopSession();
                    }
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
                    },
                    systemInstruction: "You are a helpful, concise financial assistant for SmartLoansAnalysis. Keep answers short and professional.",
                }
            });

            sessionRef.current = sessionPromise;

        } catch (err) {
            console.error(err);
            setError("Failed to access microphone or connect.");
            setStatus("Error");
        }
    };

    const stopSession = () => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (processorRef.current) {
            processorRef.current.disconnect();
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        // There is no explicit .close() on the session object in the SDK typings in some versions,
        // but disconnecting the websocket is handled by browser on component unmount or context cleanup.
        // If the SDK session object has a close, call it.
        sessionRef.current?.then((s: any) => s.close && s.close());
        
        setIsActive(false);
        setStatus("Ready");
        setVolume(0);
    };

    useEffect(() => {
        return () => stopSession();
    }, []);

    return (
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-700">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
                    <h3 className="font-bold text-lg">Live Audio Assistant</h3>
                </div>
                {status !== "Ready" && <span className="text-xs font-mono text-slate-400 uppercase">{status}</span>}
            </div>

            <div className="h-32 bg-slate-800 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
                {isActive ? (
                    <div className="flex items-center gap-2">
                        {/* Audio Visualizer Bars */}
                        {[...Array(5)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-3 bg-blue-500 rounded-full transition-all duration-75"
                                style={{ height: `${20 + (volume * 100 * Math.random())}px` }}
                            ></div>
                        ))}
                    </div>
                ) : (
                    <Volume2 className="w-12 h-12 text-slate-600" />
                )}
                {error && (
                    <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center text-red-200 gap-2 p-4 text-center">
                        <AlertCircle className="w-5 h-5" /> {error}
                    </div>
                )}
            </div>

            <button
                onClick={isActive ? stopSession : startSession}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    isActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]'
                }`}
            >
                {isActive ? (
                    <><MicOff className="w-5 h-5" /> End Conversation</>
                ) : (
                    <><Mic className="w-5 h-5" /> Start Live Chat</>
                )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
                Powered by Gemini 2.5 Native Audio
            </p>
        </div>
    );
};

export default LiveAssistant;