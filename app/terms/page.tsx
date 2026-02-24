'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Scale, AlertTriangle, CreditCard, Shield, Ban, Globe, Gavel, Mail, Sun, Moon, ChevronRight } from 'lucide-react';

export default function TermsOfServicePage() {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const isDark = theme === 'dark';

    const sections = [
        {
            id: 'acceptance',
            icon: FileText,
            title: '1. Acceptance of Terms',
            content: [
                {
                    subtitle: 'Agreement to Terms',
                    text: 'By accessing or using the Bloop Global website, applications, and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Services.'
                },
                {
                    subtitle: 'Eligibility',
                    text: 'You must be at least 18 years of age, or the age of legal majority in your jurisdiction, to use our Services. By using our Services, you represent and warrant that you meet these eligibility requirements.'
                },
                {
                    subtitle: 'Modifications',
                    text: 'We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website with a new effective date. Your continued use of our Services after such modifications constitutes your acceptance of the updated Terms.'
                }
            ]
        },
        {
            id: 'services',
            icon: Globe,
            title: '2. Description of Services',
            content: [
                {
                    subtitle: 'Services Offered',
                    text: 'Bloop Global provides technology consulting, software development, venture building, strategic advisory, and related digital services. Our Services may include, but are not limited to: custom software development, website design and development, mobile application development, business consulting, investment advisory, and educational content.'
                },
                {
                    subtitle: 'Service Availability',
                    text: 'We strive to maintain the availability of our Services but do not guarantee uninterrupted access. We may modify, suspend, or discontinue any aspect of our Services at any time without prior notice.'
                },
                {
                    subtitle: 'Third-Party Services',
                    text: 'Our Services may integrate with or link to third-party services. We are not responsible for the content, policies, or practices of any third-party services.'
                }
            ]
        },
        {
            id: 'accounts',
            icon: Shield,
            title: '3. User Accounts',
            content: [
                {
                    subtitle: 'Account Creation',
                    text: 'Some of our Services may require you to create an account. You agree to provide accurate, current, and complete information during registration and to update your information to keep it accurate.'
                },
                {
                    subtitle: 'Account Security',
                    text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.'
                },
                {
                    subtitle: 'Account Termination',
                    text: 'We reserve the right to suspend or terminate your account at our sole discretion, with or without notice, for any reason, including violation of these Terms.'
                }
            ]
        },
        {
            id: 'user-conduct',
            icon: Scale,
            title: '4. User Conduct',
            content: [
                {
                    subtitle: 'Acceptable Use',
                    text: 'You agree to use our Services only for lawful purposes and in accordance with these Terms. You will not use our Services to engage in any activity that violates applicable laws or regulations.'
                },
                {
                    subtitle: 'Prohibited Activities',
                    text: 'You may not: (a) use our Services to transmit harmful, offensive, or illegal content; (b) attempt to gain unauthorized access to our systems or networks; (c) interfere with or disrupt our Services; (d) impersonate any person or entity; (e) collect user information without consent; (f) use our Services for competitive analysis without permission; (g) reverse engineer or attempt to extract source code from our Services.'
                },
                {
                    subtitle: 'Content Standards',
                    text: 'Any content you submit through our Services must not be defamatory, obscene, threatening, invasive of privacy, or otherwise objectionable. We reserve the right to remove any content that violates these standards.'
                }
            ]
        },
        {
            id: 'intellectual-property',
            icon: Ban,
            title: '5. Intellectual Property',
            content: [
                {
                    subtitle: 'Our Intellectual Property',
                    text: 'All content, features, and functionality of our Services, including but not limited to text, graphics, logos, icons, images, audio, video, software, and the compilation thereof, are the exclusive property of Bloop Global or its licensors and are protected by copyright, trademark, and other intellectual property laws.'
                },
                {
                    subtitle: 'Limited License',
                    text: 'We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for your personal or internal business purposes. This license does not include the right to: (a) modify or copy our content; (b) use our content for commercial purposes without permission; (c) remove any copyright or proprietary notices.'
                },
                {
                    subtitle: 'User Content',
                    text: 'You retain ownership of any content you submit to our Services. By submitting content, you grant us a worldwide, royalty-free, non-exclusive license to use, reproduce, modify, publish, and distribute such content in connection with our Services.'
                },
                {
                    subtitle: 'Client Work',
                    text: 'For custom development projects, intellectual property rights are governed by the specific agreements between Bloop Global and the client. Unless otherwise specified in a written agreement, all work product created for clients becomes the property of the client upon full payment.'
                }
            ]
        },
        {
            id: 'payments',
            icon: CreditCard,
            title: '6. Payments and Billing',
            content: [
                {
                    subtitle: 'Pricing',
                    text: 'Prices for our Services are as quoted on our website or in individual proposals. We reserve the right to change our prices at any time without prior notice. Price changes will not affect orders already placed.'
                },
                {
                    subtitle: 'Payment Terms',
                    text: 'Payment terms are specified in individual service agreements or at the time of purchase. For project-based work, we typically require a deposit before commencing work, with the balance due upon completion or according to agreed milestones.'
                },
                {
                    subtitle: 'Refunds',
                    text: 'Refund policies vary by service type and are specified in individual service agreements. For digital products and services, refunds may not be available after delivery unless otherwise stated. Contact us for specific refund inquiries.'
                },
                {
                    subtitle: 'Taxes',
                    text: 'You are responsible for paying all applicable taxes associated with your purchases. We may be required to collect and remit taxes in certain jurisdictions.'
                }
            ]
        },
        {
            id: 'disclaimers',
            icon: AlertTriangle,
            title: '7. Disclaimers and Limitations',
            content: [
                {
                    subtitle: 'As-Is Basis',
                    text: 'OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.'
                },
                {
                    subtitle: 'No Guarantee of Results',
                    text: 'We do not guarantee any specific results from using our Services, including but not limited to: business growth, revenue increases, investment returns, or any other outcome. Past performance is not indicative of future results.'
                },
                {
                    subtitle: 'Limitation of Liability',
                    text: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, BLOOP GLOBAL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM: (A) YOUR USE OR INABILITY TO USE OUR SERVICES; (B) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS; (C) ANY INTERRUPTION OR CESSATION OF OUR SERVICES; (D) ANY BUGS, VIRUSES, OR THE LIKE TRANSMITTED THROUGH OUR SERVICES.'
                },
                {
                    subtitle: 'Maximum Liability',
                    text: 'In no event shall our total liability to you for all claims exceed the amount you paid to us in the twelve (12) months preceding the claim, or $100 USD, whichever is greater.'
                }
            ]
        },
        {
            id: 'indemnification',
            icon: Shield,
            title: '8. Indemnification',
            content: [
                {
                    subtitle: 'Your Responsibility',
                    text: 'You agree to indemnify, defend, and hold harmless Bloop Global, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys\' fees) arising out of or related to: (a) your use of our Services; (b) your violation of these Terms; (c) your violation of any rights of another party; (d) any content you submit through our Services.'
                }
            ]
        },
        {
            id: 'governing-law',
            icon: Gavel,
            title: '9. Governing Law and Disputes',
            content: [
                {
                    subtitle: 'Governing Law',
                    text: 'These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.'
                },
                {
                    subtitle: 'Dispute Resolution',
                    text: 'Any dispute arising out of or relating to these Terms or our Services shall first be attempted to be resolved through good faith negotiations. If negotiations fail, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.'
                },
                {
                    subtitle: 'Class Action Waiver',
                    text: 'You agree to resolve disputes with us on an individual basis and waive any right to participate in a class action lawsuit or class-wide arbitration.'
                },
                {
                    subtitle: 'Time Limitation',
                    text: 'Any claim or cause of action arising out of or related to these Terms or our Services must be filed within one (1) year after such claim or cause of action arose, or be forever barred.'
                }
            ]
        },
        {
            id: 'termination',
            icon: Ban,
            title: '10. Termination',
            content: [
                {
                    subtitle: 'Termination by You',
                    text: 'You may terminate your account and stop using our Services at any time by contacting us or using the account deletion feature if available.'
                },
                {
                    subtitle: 'Termination by Us',
                    text: 'We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including if you breach these Terms.'
                },
                {
                    subtitle: 'Effect of Termination',
                    text: 'Upon termination, your right to use our Services will immediately cease. Provisions of these Terms that by their nature should survive termination shall remain in effect, including but not limited to: intellectual property provisions, disclaimers, limitations of liability, and indemnification.'
                }
            ]
        },
        {
            id: 'general',
            icon: FileText,
            title: '11. General Provisions',
            content: [
                {
                    subtitle: 'Entire Agreement',
                    text: 'These Terms, together with our Privacy Policy and any other legal notices published on our website, constitute the entire agreement between you and Bloop Global regarding our Services.'
                },
                {
                    subtitle: 'Severability',
                    text: 'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.'
                },
                {
                    subtitle: 'Waiver',
                    text: 'Our failure to enforce any right or provision of these Terms shall not be considered a waiver of such right or provision.'
                },
                {
                    subtitle: 'Assignment',
                    text: 'You may not assign or transfer your rights under these Terms without our prior written consent. We may assign our rights and obligations under these Terms without your consent.'
                }
            ]
        },
        {
            id: 'contact',
            icon: Mail,
            title: '12. Contact Information',
            content: [
                {
                    subtitle: 'Questions or Concerns',
                    text: 'If you have any questions or concerns about these Terms of Service, please contact us at:'
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
                        <Scale className="w-4 h-4 text-red-500" />
                        <span className="text-red-500 text-xs font-mono tracking-widest uppercase">
                            Legal Document
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                        Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Service</span>
                    </h1>

                    <p className={`text-lg md:text-xl max-w-2xl leading-relaxed transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        These terms govern your use of our website and services. Please read them carefully before using our platform.
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
                                                    For legal inquiries, please include "Legal Inquiry" in your email subject line for faster processing.
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

            {/* Related Links */}
            <section className={`py-12 px-6 border-t transition-colors duration-500 ${isDark ? 'border-gray-800 bg-gray-900/20' : 'border-gray-200 bg-gray-50'}`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-lg font-semibold mb-6 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Related Legal Documents
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link prefetch={false} href="/privacy-policy" className={`p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${isDark
                            ? 'border-gray-800 bg-gray-900/30 hover:border-red-900/50'
                            : 'border-gray-200 bg-white hover:border-red-200 hover:shadow-lg'}`}>
                            <div className="flex items-center space-x-3">
                                <Shield className="w-6 h-6 text-red-500" />
                                <div>
                                    <h3 className={`font-semibold transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Privacy Policy
                                    </h3>
                                    <p className={`text-sm transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                                        How we collect and use your data
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <Link prefetch={false} href="/contact" className={`p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${isDark
                            ? 'border-gray-800 bg-gray-900/30 hover:border-red-900/50'
                            : 'border-gray-200 bg-white hover:border-red-200 hover:shadow-lg'}`}>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-6 h-6 text-red-500" />
                                <div>
                                    <h3 className={`font-semibold transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Contact Us
                                    </h3>
                                    <p className={`text-sm transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                                        Get in touch with our team
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className={`py-20 border-t relative overflow-hidden transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-200 bg-white'}`}>
                <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${isDark ? 'from-red-900/20 via-black to-black' : 'from-red-100/50 via-white to-white'}`}></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <Scale className="w-12 h-12 text-red-500 mx-auto mb-6" />
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Questions About Our Terms?
                    </h2>
                    <p className={`text-lg mb-8 max-w-2xl mx-auto transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We're committed to transparency. If anything in these terms is unclear, our team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link prefetch={false} href="/contact">
                            <button className={`px-8 py-4 rounded-full font-bold transition-all duration-200 hover:scale-105 ${isDark
                                ? 'bg-white text-black hover:bg-gray-200'
                                : 'bg-black text-white hover:bg-gray-800'}`}
                            >
                                Contact Us
                            </button>
                        </Link>
                        <Link prefetch={false} href="/">
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
