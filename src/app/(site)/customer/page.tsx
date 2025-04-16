
import Details from "@/components/Home/customerDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '고객 상세 정보',
  description: '고객의 적립 내역을 조회 페이지',
};

export default function Home() {
  return (
    <Details />
  );
}
