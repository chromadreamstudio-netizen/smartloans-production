import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // جلب كلمة السر من الرابط للتأكد أن n8n فقط هو من يستطيع التحديث
    const secret = request.nextUrl.searchParams.get('secret');

    // يمكنك تغيير 'waleed123' لأي كلمة سر تختارها
    if (secret !== 'waleed123') {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // أمر تحديث كاش صفحة المقالات
    revalidatePath('/articles');
    revalidatePath('/'); // نحدث الصفحة الرئيسية أيضاً في حال كانت المقالات تظهر هناك

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}