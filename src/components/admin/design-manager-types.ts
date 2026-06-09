export type DesignStatus = "Draft" | "Published";

export type DesignRecord = {
  id: number;
  title: string;
  category: string;
  style: string;
  status: DesignStatus;
  displayOrder: number;
  description: string;
  imageUrl: string | null;
  imageAlt: string;
  galleryCount: number;
  createdAt: string;
};

export type DesignFormState = {
  title: string;
  category: string;
  style: string;
  status: DesignStatus;
  displayOrder: string;
  description: string;
  imageAlt: string;
};
