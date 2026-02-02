'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Eye, Cookie, Database, Mail, Globe, Lock, FileText, Sun, Moon, ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const isDark = theme === 'dark';

    const sections = [
        {
            id: 'information-collection',
            icon: Database,
            title: '1. Information We Collect',
            content: [
                {
                    subtitle: 'Personal Information',
                    text: 'When you interact with our website, we may collect personal information that you voluntarily provide, including but not limited to: name, email address, phone number, company name, job title, and any other information you choose to provide through our contact forms, newsletter subscriptions, or account registration.'
                },
                {
                    subtitle: 'Automatically Collected Information',
                    text: 'We automatically collect certain information when you visit our website, including your IP address, browser type, device information, operating system, referring URLs, pages viewed, time spent on pages, and other browsing behavior data.'
                },
                {
                    subtitle: 'Cookies and Tracking Technologies',
                    text: 'We use cookies, pixel tags, and similar technologies to collect information about your browsing activities. This includes first-party and third-party cookies for analytics, advertising, and functionality purposes.'
                }
            ]
        },
        {
            id: 'how-we-use',
            icon: Eye,
            title: '2. How We Use Your Information',
            content: [
                {
                    subtitle: 'Service Delivery',
                    text: 'To provide, maintain, and improve our services, process transactions, send you related information, and respond to your inquiries and requests.'
                },
                {
                    subtitle: 'Communication',
                    text: 'To send you newsletters, marketing communications, promotional materials, and other information that may be of interest to you. You can opt-out of these communications at any time.'
                },
                {
                    subtitle: 'Analytics and Improvement',
                    text: 'To understand how visitors use our website, analyze trends, track user movements, and gather demographic information to improve our services and user experience.'
                },
                {
                    subtitle: 'Advertising',
                    text: 'To deliver targeted advertisements, measure their effectiveness, and provide relevant content based on your interests and browsing behavior.'
                }
            ]
        },
        {
            id: 'third-party',
            icon: Globe,
            title: '3. Third-Party Services',
            content: [
                {
                    subtitle: 'Analytics Services',
                    text: 'We use Google Analytics to analyze website traffic and user behavior. Google Analytics uses cookies to collect anonymous information about how visitors use our site.'
                },
                {
                    subtitle: 'Advertising Partners',
                    text: 'We use Meta (Facebook) Pixel and other advertising technologies to track conversions, optimize ads, build targeted audiences, and remarket to people who have visited our website. These tools may collect data about your online activity across different websites and services.'
                },
                {
                    subtitle: 'Payment Processors',
                    text: 'When you make a purchase, your payment information is processed directly by our payment partners (such as Stripe and Paystack). We do not store your full credit card information on our servers.'
                },
                {
                    subtitle: 'Email Services',
                    text: 'We use third-party email service providers (such as Resend and ConvertKit) to manage our email communications and newsletters.'
                }
            ]
        },
        {
            id: 'cookies',
            icon: Cookie,
            title: '4. Cookies Policy',
            content: [
                {
                    subtitle: 'What Are Cookies',
                    text: 'Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, understand how you use our site, and improve your browsing experience.'
                },
                {
                    subtitle: 'Types of Cookies We Use',
                    text: 'Essential Cookies: Required for the website to function properly. Analytics Cookies: Help us understand how visitors interact with our website. Advertising Cookies: Used to deliver relevant advertisements and track ad campaign performance. Preference Cookies: Remember your settings and preferences.'
                },
                {
                    subtitle: 'Managing Cookies',
                    text: 'You can control and delete cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website. Most browsers allow you to refuse cookies or alert you when cookies are being sent.'
                }
            ]
        },
        {
            id: 'data-security',
            icon: Lock,
            title: '5. Data Security',
            content: [
                {
                    subtitle: 'Security Measures',
                    text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.'
                },
                {
                    subtitle: 'Data Retention',
                    text: 'We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.'
                },
                {
                    subtitle: 'Third-Party Security',
                    text: 'While we take steps to ensure our third-party partners maintain adequate security measures, we cannot guarantee the security of data transmitted to or stored by third parties.'
                }
            ]
        },
        {
            id: 'your-rights',
            icon: FileText,
            title: '6. Your Rights',
            content: [
                {
                    subtitle: 'Access and Correction',
                    text: 'You have the right to access, correct, or update your personal information at any time. You can do this by contacting us directly or through your account settings if applicable.'
                },
                {
                    subtitle: 'Deletion',
                    text: 'You may request the deletion of your personal information, subject to certain exceptions required by law or legitimate business purposes.'
                },
                {
                    subtitle: 'Opt-Out',
                    text: 'You can opt-out of receiving marketing emails by clicking the "unsubscribe" link in any email we send. You can also opt-out of targeted advertising by adjusting your ad preferences on platforms like Facebook or through industry opt-out tools.'
                },
                {
                    subtitle: 'Do Not Track',
                    text: 'Some browsers offer a "Do Not Track" feature. Currently, our website does not respond to Do Not Track signals, but you can manage your cookie preferences manually.'
                }
            ]
        },
        {
            id: 'international',
            icon: Globe,
            title: '7. International Data Transfers',
            content: [
                {
                    subtitle: 'Global Operations',
                    text: 'We operate internationally and may transfer your personal information to countries outside your country of residence. These countries may have different data protection laws than your country.'
                },
                {
                    subtitle: 'Safeguards',
                    text: 'When we transfer data internationally, we implement appropriate safeguards to ensure your information receives adequate protection, including standard contractual clauses and other approved transfer mechanisms.'
                }
            ]
        },
        {
            id: 'children',
            icon: Shield,
            title: '8. Children\'s Privacy',
            content: [
                {
                    subtitle: 'Age Restriction',
                    text: 'Our services are not intended for children under the age of 13 (or 16 in certain jurisdictions). We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information promptly.'
                }
            ]
        },
        {
            id: 'updates',
            icon: FileText,
            title: '9. Policy Updates',
            content: [
                {
                    subtitle: 'Changes to This Policy',
                    text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our website with a new effective date.'
                },
                {
                    subtitle: 'Your Continued Use',
                    text: 'Your continued use of our website after any changes to this Privacy Policy constitutes your acceptance of the updated terms.'
                }
            ]
        },
        {
            id: 'contact',
            icon: Mail,
            title: '10. Contact Us',
            content: [
                {
                    subtitle: 'Questions or Concerns',
                    text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:'
                }
            ]
        }
    ];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-black text-white selection:bg-red-900 selection:text-white' : 'bg-gray-50 text-gray-900 selection:bg-red-200 selection:text-black'}`}>

            {/* Theme Toggle - Fixed Position */}
            <div className="fixed top-24 right-6 z-50">
                <button
                    onClick={toggleTheme}
                    className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                    aria-label="Toggle Theme"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            {/* Hero Section */}
            <section className={`relative pt-40 pb-20 px-6 border-b overflow-hidden transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-200 bg-white'}`}>
                {/* Background Elements */}
                <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${isDark ? 'opacity-100' : 'opacity-50'}`}></div>
                <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-red-900/10' : 'bg-red-500/5'}`}></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className={`inline-flex items-center space-x-2 mb-6 border px-4 py-1.5 rounded-full transition-colors duration-500 ${isDark ? 'border-red-900/50 bg-red-950/20' : 'border-red-200 bg-red-50'}`}>
                        <Shield className="w-4 h-4 text-red-500" />
                        <span className="text-red-500 text-xs font-mono tracking-widest uppercase">
                            Legal Document
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Policy</span>
                    </h1>

                    <p className={`text-lg md:text-xl max-w-2xl leading-relaxed transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Your privacy matters to us. This policy explains how we collect, use, protect, and share your information when you visit our website or use our services.
                    </p>

                    <div className={`mt-8 flex items-center space-x-4 text-sm font-mono transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        <span>Last Updated: February 2, 2026</span>
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        <span>Effective Immediately</span>
                    </div>
                </div>
            </section>

            {/* Quick Navigation */}
            <section className={`py-8 px-6 border-b transition-colors duration-500 ${isDark ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-100/50'}`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-sm font-mono uppercase tracking-widest mb-4 transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Quick Navigation
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 hover:scale-105 ${isDark
                                    ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-red-900/50 hover:bg-red-950/20'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:bg-red-50'}`}
                            >
                                {section.title.split('. ')[1]}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    {sections.map((section) => {
                        const IconComponent = section.icon;
                        return (
                            <div key={section.id} id={section.id} className="scroll-mt-32">
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className={`p-3 rounded-xl transition-colors duration-500 ${isDark ? 'bg-red-950/30 border border-red-900/50' : 'bg-red-50 border border-red-200'}`}>
                                        <IconComponent className="w-6 h-6 text-red-500" />
                                    </div>
                                    <h2 className={`text-2xl md:text-3xl font-bold transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {section.title}
                                    </h2>
                                </div>

                                <div className="space-y-6">
                                    {section.content.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-6 rounded-xl border transition-all duration-300 ${isDark
                                                ? 'border-gray-800 bg-gray-900/30 hover:border-gray-700'
                                                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}`}
                                        >
                                            <h3 className={`text-lg font-semibold mb-3 flex items-center transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                                                {item.subtitle}
                                            </h3>
                                            <p className={`leading-relaxed transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}

                                    {/* Contact Details Section */}
                                    {section.id === 'contact' && (
                                        <div className={`p-8 rounded-xl border-2 transition-all duration-300 ${isDark
                                            ? 'border-red-900/50 bg-red-950/10'
                                            : 'border-red-200 bg-red-50'}`}
                                        >
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-3">
                                                    <Mail className="w-5 h-5 text-red-500" />
                                                    <span className={`transition-colors duration-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        <strong>Email:</strong> ask@bloopglobal.com
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <Globe className="w-5 h-5 text-red-500" />
                                                    <span className={`transition-colors duration-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        <strong>Website:</strong> www.bloopglobal.com
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={`mt-6 pt-6 border-t transition-colors duration-500 ${isDark ? 'border-red-900/30' : 'border-red-200'}`}>
                                                <p className={`text-sm transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                                                    For data subject access requests or privacy concerns, please include "Privacy Request" in your email subject line for faster processing.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Footer CTA */}
            <section className={`py-20 border-t relative overflow-hidden transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-200 bg-white'}`}>
                <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${isDark ? 'from-red-900/20 via-black to-black' : 'from-red-100/50 via-white to-white'}`}></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <Shield className="w-12 h-12 text-red-500 mx-auto mb-6" />
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Your Data, Your Control
                    </h2>
                    <p className={`text-lg mb-8 max-w-2xl mx-auto transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Have questions about our privacy practices or want to exercise your rights? We're here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <button className={`px-8 py-4 rounded-full font-bold transition-all duration-200 hover:scale-105 ${isDark
                                ? 'bg-white text-black hover:bg-gray-200'
                                : 'bg-black text-white hover:bg-gray-800'}`}
                            >
                                Contact Us
                            </button>
                        </Link>
                        <Link href="/">
                            <button className={`px-8 py-4 rounded-full font-bold border transition-all duration-200 hover:scale-105 ${isDark
                                ? 'border-gray-700 text-white hover:border-red-900/50 hover:bg-red-950/20'
                                : 'border-gray-300 text-gray-900 hover:border-red-200 hover:bg-red-50'}`}
                            >
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
