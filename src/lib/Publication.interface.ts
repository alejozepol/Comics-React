export interface Publication{
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
  reaction?: {
    icon: string;
    name: string;
  };
};

export interface Responsive{
  error: boolean;
  body: any;
}