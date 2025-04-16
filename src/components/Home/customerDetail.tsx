'use client';

import { use, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Coupon = {
    id: number;
    createdAt: string;
    expiresAt: string;
};

export default function Details() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [stamps, setStamps] = useState<number | null>(null);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [createdAt, setCreatedAt] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3').slice(0, 13);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/-/g, '');
        setPhoneNumber(formatPhoneNumber(raw));
    };

    const handleSubmit = async () => {
        try {
            const raw = phoneNumber.replace(/-/g, '');
            const res = await axios.get('/api/customer-detail', {
                params: { phoneNumber: raw },
            });

            if (res.data.response) {
                setStamps(res.data.response.stamps);
                setCoupons(res.data.response.coupons);
                setCreatedAt(res.data.response.createdAt);
                setMessage('조회 성공');
            } else if (res.data.message) {
                // Show error message from the server
                setMessage(res.data.message);
                setStamps(null);
                setCoupons([]);
                setCreatedAt(null);
            }
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Error: 조회 실패');
            setStamps(null);
            setCoupons([]);
            setCreatedAt(null);
        }
    };

    const isError = message.includes('Error');

    return (
        <main style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            padding: '2rem',
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative'
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '2rem',
                width: '100%',
            }}>
                <h1 style={{
                    marginBottom: '1.5rem',
                    color: '#333',
                    fontSize: '2rem'
                }}>
                    📋 고객 정보 조회
                </h1>

                <div style={{ marginBottom: '1.5rem', marginTop: '2.5rem' }}>
                    <input
                        type="text"
                        placeholder="010-1234-5678"
                        value={phoneNumber}
                        onChange={handleChange}
                        maxLength={13}
                        style={{
                            fontSize: '1.2rem',
                            padding: '0.8rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            width: '70%',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.3s',
                            outline: 'none',
                        }}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    style={{
                        fontSize: '1.1rem',
                        padding: '0.8rem 1.5rem',
                        backgroundColor: '#4361ee',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '70%',
                        transition: 'background-color 0.3s',
                        marginBottom: '1.5rem'
                    }}
                >
                    조회하기
                </button>

                {message && <p style={{
                    marginTop: '1rem',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    backgroundColor: isError ? '#fef1f2' : '#ecfdf5',
                    borderRadius: '8px',
                    color: isError ? '#b91c1c' : '#047857',
                    width: '65%',
                    margin: '0 auto',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    border: `1px solid ${isError ? '#fecdd3' : '#a7f3d0'}`
                }}>{message}</p>}

                {stamps !== null && (
                    <div style={{
                        margin: '0 auto',
                        marginTop: '1rem',
                        padding: '1.5rem',
                        backgroundColor: '#f0f4ff',
                        borderRadius: '8px',
                        color: '#333',
                        width: '65%',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        textAlign: 'left'
                    }}>
                        <p style={{ marginBottom: '0.5rem' }}>✅ 현재 스탬프: {stamps}개</p>
                        <p style={{ marginBottom: '1rem' }}>📅 첫 적립일자: {createdAt ? new Date(createdAt).toLocaleDateString() : '-'}</p>
                        <h3 style={{ marginBottom: '0.75rem' }}>🎟️ 쿠폰 목록:</h3>
                        {coupons.length > 0 ? (
                            <ul style={{
                                listStyleType: 'none',
                                padding: '0',
                                margin: '0'
                            }}>
                                {coupons.map((coupon) => (
                                    <li key={coupon.id} style={{
                                        padding: '0.5rem 0',
                                        borderBottom: '1px solid rgba(0,0,0,0.05)'
                                    }}>
                                        발급: {new Date(coupon.createdAt).toLocaleDateString()} ~
                                        만료: {new Date(coupon.expiresAt).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>사용 가능한 쿠폰이 없습니다.</p>
                        )}
                    </div>
                )}

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '85%',
                    marginTop: '2rem'
                }}>
                    <Link href="/" style={{
                        color: '#4361ee',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <span>스탬프 적립 화면</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </main>
    );
}