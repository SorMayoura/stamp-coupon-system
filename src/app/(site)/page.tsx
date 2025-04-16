
import EarnStamp from "@/components/Home/earnStamp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '스탬프를 적립',
  description: '스탬프를 적립 페이지',
};

export default function Home() {
  return (
    <EarnStamp />
  );
}
