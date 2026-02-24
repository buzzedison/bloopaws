"use client";

import Link from "next/link";

export default function ReferralTermsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Referral Program Terms & Conditions</h1>
          <p className="text-lg opacity-90">Last updated: April 14, 2025</p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-10">
          <div className="prose prose-lg max-w-none">
            <h2>1. Program Overview</h2>
            <p>
              The Bloop Referral Program allows participants ("Referrers") to earn commissions by referring new clients ("Referred Clients") to Bloop's services. By participating in the Referral Program, you agree to these Terms and Conditions.
            </p>
            
            <h2>2. Eligibility</h2>
            <p>
              To be eligible to participate in the Referral Program, you must:
            </p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Have a valid email address</li>
              <li>Comply with these Terms and Conditions</li>
              <li>Not be an employee of Bloop or its affiliates</li>
            </ul>
            
            <h2>3. Commission Structure</h2>
            <p>
              The Referral Program offers two commission tiers:
            </p>
            <ul>
              <li><strong>Recommend Only:</strong> 5% commission when you refer a client who signs up for our services, without any additional involvement in the sales process.</li>
              <li><strong>Refer & Close:</strong> 15% commission when you refer a client and actively help in the sales process to close the deal.</li>
            </ul>
            <p>
              The determination of whether a referral qualifies for the "Refer & Close" tier is at the sole discretion of Bloop.
            </p>
            
            <h2>4. Referral Process</h2>
            <p>
              To refer a client, you may:
            </p>
            <ul>
              <li>Share your unique referral link with potential clients</li>
              <li>Submit a referral through the referral form on our website</li>
            </ul>
            <p>
              A referral is considered valid when:
            </p>
            <ul>
              <li>The Referred Client was not previously in Bloop's database</li>
              <li>The Referred Client signs up for Bloop's services within 90 days of the referral</li>
              <li>The Referred Client acknowledges that they were referred by you</li>
            </ul>
            
            <h2>5. Commission Payments</h2>
            <p>
              Commissions are paid out monthly for all successful referrals from the previous month. To receive payment, you must:
            </p>
            <ul>
              <li>Provide accurate payment information</li>
              <li>Have accumulated at least $50 in commissions (amounts below $50 will roll over to the next payment period)</li>
              <li>Comply with all applicable tax laws and regulations</li>
            </ul>
            <p>
              Bloop is not responsible for any taxes or fees associated with commission payments.
            </p>
            
            <h2>6. Prohibited Activities</h2>
            <p>
              The following activities are prohibited under the Referral Program:
            </p>
            <ul>
              <li>Spamming or sending unsolicited communications</li>
              <li>Misrepresenting Bloop's services or the Referral Program</li>
              <li>Creating fake or fraudulent referrals</li>
              <li>Using deceptive or unethical marketing practices</li>
              <li>Violating any applicable laws or regulations</li>
            </ul>
            <p>
              Engaging in prohibited activities may result in termination from the Referral Program and forfeiture of any unpaid commissions.
            </p>
            
            <h2>7. Term and Termination</h2>
            <p>
              The Referral Program is ongoing, but Bloop reserves the right to modify or terminate the program at any time. Bloop may also terminate your participation in the program for any reason, including violation of these Terms and Conditions.
            </p>
            <p>
              Upon termination of the program or your participation:
            </p>
            <ul>
              <li>Your referral link will be deactivated</li>
              <li>You will receive any earned commissions according to the regular payment schedule</li>
              <li>You must cease all marketing activities related to the Referral Program</li>
            </ul>
            
            <h2>8. Modifications to the Program</h2>
            <p>
              Bloop reserves the right to modify these Terms and Conditions at any time. Changes will be effective upon posting to the website. Your continued participation in the Referral Program after changes are posted constitutes acceptance of the modified terms.
            </p>
            
            <h2>9. Limitation of Liability</h2>
            <p>
              Bloop is not liable for any damages arising from your participation in the Referral Program, including but not limited to:
            </p>
            <ul>
              <li>Technical issues with the referral system</li>
              <li>Delays in commission payments</li>
              <li>Actions of Referred Clients</li>
              <li>Changes to the Referral Program</li>
            </ul>
            
            <h2>10. Contact Information</h2>
            <p>
              If you have questions about the Referral Program or these Terms and Conditions, please contact us at <a href="mailto:referrals@bloop.com" className="text-red-600 hover:text-red-800">referrals@bloop.com</a>.
            </p>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <Link prefetch={false} href="/referral" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
              Return to Referral Program
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
