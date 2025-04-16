'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function HomeBody() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers
            .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            .slice(0, 13);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/-/g, '');
        setPhoneNumber(formatPhoneNumber(raw));
    };

    const handleSubmit = async () => {
        try {
            const raw = phoneNumber.replace(/-/g, '');
            const res = await axios.post('/api/stamp', { phoneNumber: raw });
            setMessage(res.data.message);
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setMessage(err.response.data?.message || 'Server error');
            } else {
                setMessage('An unexpected error occurred');
                console.error(err);
            }
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
                    📱 스탬프 적립
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
                    스탬프 적립하기
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
                }}>
                    {isError ? '⚠️ ' : '✅ '}{message}
                </p>}

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '85%',
                    marginTop: '2rem'
                }}>
                    <Link href="/customer" style={{
                        color: '#4361ee',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <span>고객 상세 정보 화면</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </main>
    );
}