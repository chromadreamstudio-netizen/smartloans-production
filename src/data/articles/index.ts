import { ArticleData } from '../../types';

// Batch 1
import { ARTICLE_01 } from './01_financial_identity_shock';
import { ARTICLE_02 } from './02_trading_life_for_payments';
import { ARTICLE_03 } from './03_paying_for_house_i_didnt_own';
import { ARTICLE_04 } from './04_mortgage_decision_changes_everything';

// Batch 2
import { ARTICLE_05 } from './05_hidden_money_trap_2026';
import { ARTICLE_06 } from './06_smart_money_decisions_2026';
import { ARTICLE_07 } from './07_interest_rate_cuts_2026';
import { ARTICLE_08 } from './08_financial_trends_2026';

// Batch 3
import { ARTICLE_09 } from './09_comprehensive_platform_guide';
import { ARTICLE_10 } from './10_housing_market_strategy_2026';
import { ARTICLE_11 } from './11_psychology_of_debt_management';
import { ARTICLE_12 } from './12_power_of_compound_interest';
import { ARTICLE_13 } from './13_coast_fire_rebellion';

// ✅ Batch 4 (New Trending)
import { ARTICLE_14 } from './14_palantir_miami_move';
import { ARTICLE_15 } from './15_alaska_geopolitics_mortgage'; 
import { ARTICLE_16 } from './16_embedded_finance_future'; // ✅ تمت إضافة المقالة الجديدة (16) هنا

export const ALL_ARTICLES: Record<string, ArticleData> = {
  ...ARTICLE_01,
  ...ARTICLE_02,
  ...ARTICLE_03,
  ...ARTICLE_04,
  ...ARTICLE_05,
  ...ARTICLE_06,
  ...ARTICLE_07,
  ...ARTICLE_08,
  ...ARTICLE_09,
  ...ARTICLE_10,
  ...ARTICLE_11,
  ...ARTICLE_12,
  ...ARTICLE_13,
  ...ARTICLE_14,
  ...ARTICLE_15, 
  ...ARTICLE_16, // ✅ تم الدمج في القائمة الرئيسية
};

export const articlesList = Object.entries(ALL_ARTICLES).map(([slug, data]) => ({
  slug,
  ...data,
}));

export const getSortedArticles = () => {
  return articlesList.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};