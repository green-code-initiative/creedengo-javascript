import { Controller, Get } from "@nestjs/common";

interface Pagination {
  items: string[];
  currentPage: number;
  totalPages: number;
}

@Controller("cats")
export class CatsController {
  @Get("raw") // Non-compliant: raw collection is not paginated
  public getRawCollection(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["Siamese", "Maine Coon", "Chartreux"]);
      }, 300);
    });
  }

  @Get(":id") // Compliant: find a specific item of a collection
  public getSpecificItem(): Promise<string> {
    return null;
  }

  @Get("page") // Compliant: collection is paginated
  public getPaginatedCollection(): Promise<Pagination> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          items: ["Siamese", "Maine Coon", "Chartreux"],
          currentPage: 0,
          totalPages: 1,
        });
      }, 300);
    });
  }
}
