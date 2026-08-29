import { db } from '../models/database.js';
import { Crop, FarmTask } from '../types/index.js';

export class CropService {
  public static getAllCrops(farmId?: string): Crop[] {
    const list = Array.from(db.crops.values());
    return farmId ? list.filter((c) => c.farmId === farmId) : list;
  }

  public static getCropById(id: string): Crop | undefined {
    return db.crops.get(id);
  }

  public static createCrop(data: Omit<Crop, 'id' | 'timeline'>): Crop {
    const id = `crop-${Date.now()}`;
    const defaultTimeline: Crop['timeline'] = [
      { id: 'seed', name: 'Land Prep & Seed Sowing', status: 'active', progress: 30, estimatedDate: data.sowingDate, notes: 'Initial soil conditioning', tasks: ['Soil testing', 'Basal fertilizer'] },
      { id: 'germination', name: 'Germination & Sprouting', status: 'upcoming', progress: 0, estimatedDate: 'In 2 weeks', notes: 'Seedling emergence', tasks: ['First weeding', 'Moisture check'] },
      { id: 'growth', name: 'Vegetative Growth', status: 'upcoming', progress: 0, estimatedDate: 'In 5 weeks', notes: 'Canopy development', tasks: ['Nutrient top dress', 'Pest watch'] },
      { id: 'flowering', name: 'Flowering & Fruit Setting', status: 'upcoming', progress: 0, estimatedDate: 'In 9 weeks', notes: 'Critical water stage', tasks: ['Micronutrient spray'] },
      { id: 'harvest', name: 'Maturity & Harvesting', status: 'upcoming', progress: 0, estimatedDate: data.expectedHarvestDate, notes: 'Mandi pricing peak window', tasks: ['Harvest labor', 'Mandi transport'] }
    ];

    const crop: Crop = {
      ...data,
      id,
      timeline: defaultTimeline
    };
    db.crops.set(id, crop);
    return crop;
  }

  public static advanceStage(id: string, stageId: Crop['currentStage']): Crop | null {
    const crop = db.crops.get(id);
    if (!crop) return null;

    const stages: Crop['currentStage'][] = ['seed', 'germination', 'growth', 'flowering', 'harvest'];
    const targetIdx = stages.indexOf(stageId);

    const updatedTimeline = crop.timeline.map((s, idx) => {
      if (idx < targetIdx) {
        return { ...s, status: 'completed' as const, progress: 100 };
      } else if (idx === targetIdx) {
        return { ...s, status: 'active' as const, progress: 50 };
      } else {
        return { ...s, status: 'upcoming' as const, progress: 0 };
      }
    });

    const updated: Crop = {
      ...crop,
      currentStage: stageId,
      timeline: updatedTimeline
    };
    db.crops.set(id, updated);
    return updated;
  }

  public static deleteCrop(id: string): boolean {
    return db.crops.delete(id);
  }

  // Tasks
  public static getAllTasks(): FarmTask[] {
    return Array.from(db.tasks.values());
  }

  public static addTask(data: Omit<FarmTask, 'id' | 'completed'>): FarmTask {
    const id = `tsk-${Date.now()}`;
    const task: FarmTask = { ...data, id, completed: false };
    db.tasks.set(id, task);
    return task;
  }

  public static toggleTask(id: string): FarmTask | null {
    const task = db.tasks.get(id);
    if (!task) return null;
    task.completed = !task.completed;
    db.tasks.set(id, task);
    return task;
  }
}
