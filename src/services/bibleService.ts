import { BiblePassage, ReadingPlan, ReadingPlanDay } from '../types';
import { READING_PLANS } from '../data/initialData';

export interface BibleProvider {
  getPassage(reference: string): Promise<BiblePassage | null>;
  searchPassages(query: string): Promise<BiblePassage[]>;
}

/**
 * Clean data abstraction for Bible content.
 * Can be swapped with an API.Bible, ESV API, or custom backend provider in future
 * without altering UI components.
 */
class LocalBibleProvider implements BibleProvider {
  private plans: ReadingPlan[] = READING_PLANS;

  async getPassage(reference: string): Promise<BiblePassage | null> {
    const cleanRef = reference.trim().toLowerCase();
    for (const plan of this.plans) {
      for (const day of plan.days) {
        if (day.scriptureReference.toLowerCase().includes(cleanRef) || cleanRef.includes(day.scriptureReference.toLowerCase())) {
          return day.passage;
        }
      }
    }
    // Return default John 15 passage if not found
    return this.plans[0].days[0].passage;
  }

  async searchPassages(query: string): Promise<BiblePassage[]> {
    const q = query.toLowerCase();
    const results: BiblePassage[] = [];
    for (const plan of this.plans) {
      for (const day of plan.days) {
        if (
          day.passage.book.toLowerCase().includes(q) ||
          day.scriptureReference.toLowerCase().includes(q) ||
          day.title.toLowerCase().includes(q)
        ) {
          results.push(day.passage);
        }
      }
    }
    return results;
  }
}

export class BibleService {
  private static provider: BibleProvider = new LocalBibleProvider();

  static setProvider(newProvider: BibleProvider) {
    this.provider = newProvider;
  }

  static async getPassageForDay(planId: string, dayNumber: number): Promise<ReadingPlanDay | null> {
    const plan = READING_PLANS.find(p => p.id === planId) || READING_PLANS[0];
    const day = plan.days.find(d => d.dayNumber === dayNumber) || plan.days[0];
    return day || null;
  }

  static async getPassage(reference: string): Promise<BiblePassage | null> {
    return this.provider.getPassage(reference);
  }

  static getAllReadingPlans(): ReadingPlan[] {
    return READING_PLANS;
  }

  static getReadingPlan(planId: string): ReadingPlan | undefined {
    return READING_PLANS.find(p => p.id === planId) || READING_PLANS[0];
  }
}
