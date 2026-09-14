import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Globe, CalendarCheck, Check, Workflow, Users, FileText, Bell, BarChart3, Code2, GraduationCap, Headphones, Sparkles, Mail, ChevronDown, MousePointer2 } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'AI Chatbots & Business Automation',
  description: 'Website chatbots, WhatsApp assistants, and automated workflows that help you capture leads, serve customers, and reduce repetitive work.',
  openGraph: { title: 'AI Chatbots & Business Automation | Bloop Global', description: 'Respond faster. Follow up better. Get more done.', images: ['/images/ai/team-collaboration.jpg'] },
};

const services = [
  { icon: Globe, name: 'Website AI Chatbots', title: 'Give visitors answers while they’re interested.', description: 'Help customers understand your services, find what they need, and take the next step.', features: ['Answer questions using your business information.', 'Capture and qualify leads.', 'Book consultations and hand enquiries to your team.'], cta: 'Get a Website Chatbot', visual: 'website' },
  { icon: MessageCircle, name: 'WhatsApp Chatbots & Automation', title: 'Make WhatsApp work harder for your business.', description: 'Handle routine enquiries, collect customer details, and keep conversations moving—with your team available when needed.', features: ['Answer common questions.', 'Collect booking and order details.', 'Send permitted reminders and customer updates.', 'Hand conversations to the right person.'], cta: 'Automate Your WhatsApp', visual: 'whatsapp' },
  { icon: Users, name: 'Sales & Follow-up Automation', title: 'Give every enquiry a clear next step.', description: 'Connect your website, forms, email, and CRM so leads reach the right person with the right information.', features: ['Capture enquiries automatically.', 'Assign leads and notify your team.', 'Trigger follow-up tasks and reminders.', 'Schedule meetings.'], cta: 'Improve Our Follow-up', visual: 'sales' },
  { icon: Workflow, name: 'Business Workflow Automation', title: 'Stop repeating work your systems can handle.', description: 'Connect everyday tasks across your tools, from a new customer signing up to your team starting delivery.', features: ['Customer onboarding and document collection.', 'Task assignments and approval requests.', 'Invoice reminders and status updates.', 'Information moving between business tools.'], cta: 'Automate Our Workflows', visual: 'workflow' },
];
const extras = [
  [Headphones, 'AI Customer Support', 'Organise requests, answer routine questions, and escalate complex issues.'],
  [Sparkles, 'AI Assistants for Teams', 'Help staff find information, summarise meetings, and prepare routine work.'],
  [FileText, 'Document & Data Automation', 'Extract and organise information from forms, invoices, receipts, and documents.'],
  [Mail, 'Marketing & Content Automation', 'Connect content drafting, approval, scheduling, email sequences, and reporting.'],
  [BarChart3, 'Reporting & Business Insights', 'Bring your data together and prepare recurring reports without manually compiling every update.'],
  [Code2, 'Custom AI Development & Integration', 'Add tailored AI features to your website, mobile app, or existing software.'],
  [GraduationCap, 'AI Strategy & Team Training', 'Choose useful applications and give your team the skills to manage them.'],
];
const faqs = [
  ['Can you work with our existing tools?', 'We review your tools and their integration options before agreeing on scope.'],
  ['Can customers still speak to a person?', 'Yes. We build clear handover steps so your team can take over when needed.'],
  ['How much does it cost?', 'Pricing depends on the channels, workflows, and integrations required. Your proposal separates setup, ongoing support, and any platform or usage fees.'],
  ['Do we need to automate everything at once?', 'No. We can start with one useful workflow and expand from there.'],
];
function CTA({ children, secondary = false }) {
  return <Link prefetch={false} href="/contact" className={secondary ? styles.textLink : styles.button}>{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}
function ChatExample({ whatsapp = false }) {
  return <div className={`${styles.chat} ${whatsapp ? styles.whatsapp : ''}`}>
    <div className={styles.chatHeader}><span className={styles.chatIcon}>{whatsapp ? <MessageCircle size={20} /> : <Sparkles size={20} />}</span><div><strong>{whatsapp ? 'Your business on WhatsApp' : 'Your website assistant'}</strong><small>Answers. Bookings. Human support.</small></div><span className={styles.online} /></div>
    <div className={styles.messages}><span className={styles.exampleLabel}>Example conversation</span><p className={styles.customer}>{whatsapp ? 'Hi! I’d like to book a consultation.' : 'Can you help automate our enquiries?'}</p><p className={styles.reply}>{whatsapp ? 'Of course. Which service are you interested in?' : 'Yes! We can connect your website, WhatsApp, and CRM. Would you like to speak with our team?'}</p>{whatsapp && <div className={styles.chatChoices}><span>Website chatbot</span><span>Workflow automation</span></div>}<p className={styles.customer}>{whatsapp ? 'Workflow automation, please.' : 'A consultation sounds good.'}</p><div className={styles.booking}><CalendarCheck size={21} /><div><strong>{whatsapp ? 'Let’s find a time' : 'Your next step: a consultation'}</strong><small>{whatsapp ? 'Share your preferred day to get started.' : 'Choose a time that works for you.'}</small></div><ArrowRight size={17} /></div></div>
  </div>;
}
function TaskExample({ workflow = false }) {
  const items = workflow ? [[Users, 'Customer signs up', 'New customer received'], [FileText, 'Details collected', 'Everything in one place'], [Workflow, 'Project created', 'Ready for delivery'], [Bell, 'Team notified', 'The right people, in the loop']] : [[Globe, 'New website enquiry', 'Contact details captured'], [Users, 'Lead added to CRM', 'Assigned to your sales team'], [Bell, 'Follow-up task created', 'Keep the conversation moving'], [CalendarCheck, 'Meeting scheduled', 'A clear next step']];
  return <div className={styles.taskExample}><span className={styles.exampleLabel}>Example {workflow ? 'workflow' : 'lead journey'}</span>{items.map(([Icon, title, detail], i) => <div className={styles.task} key={title}><span className={styles.taskIcon}><Icon size={21}/></span><div><strong>{title}</strong><small>{detail}</small></div><Check size={17} className={styles.taskCheck}/>{i < items.length - 1 && <span className={styles.taskConnector}/>}</div>)}</div>;
}

export default function AIAutomationServices() {
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div><p className={styles.eyebrow}><span/> AI CHATBOTS & BUSINESS AUTOMATION</p><h1>Respond faster.<br/>Follow up better.<br/><em>Get more done.</em></h1><p className={styles.heroDescription}>We build website chatbots, WhatsApp assistants, and automated workflows that help you capture leads, serve customers, and reduce repetitive work.</p><CTA>Let’s Automate Your Business</CTA><p className={styles.heroNote}>Start with one chatbot, one workflow, or a connected system.</p></div>
        <div className={styles.heroVisual}><div className={styles.visualTop}><span><i/> CONNECTED & WORKING</span><span>01 — 04</span></div><Image src="/images/ai/connected-workflow.svg" width={640} height={440} priority alt="Example workflow: a website enquiry connects to WhatsApp, a CRM record, and a booked meeting." className={styles.heroDiagram}/><div className={styles.visualBottom}><span><Check size={15}/> Less chasing. More progress.</span><MousePointer2 size={20}/></div></div>
      </div>
    </section>
    <section className={styles.problem}><div className={`${styles.container} ${styles.problemGrid}`}><h2>Your team has better things to do than chase every update.</h2><div><p>Unanswered enquiries. Missed follow-ups. Information copied between tools. Customers waiting for answers.</p><strong>We connect the steps so your business keeps moving.</strong></div></div></section>
    <section className={`${styles.container} ${styles.services}`} id="services"><div className={styles.sectionHeading}><p className={styles.eyebrow}>BUILT AROUND YOUR EVERYDAY WORK</p><h2>What can we<br/>automate for you?</h2><p>Better conversations. Smoother handovers. Fewer manual steps.</p></div>
      {services.map((service, i) => <article className={`${styles.service} ${i % 2 ? styles.reverse : ''}`} key={service.name}><div className={styles.serviceCopy}><div className={styles.serviceLabel}><service.icon size={19}/><span>{service.name}</span><span className={styles.serviceNumber}>0{i+1}</span></div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.features.map(feature => <li key={feature}><Check size={17}/>{feature}</li>)}</ul><CTA secondary>{service.cta}</CTA></div><div className={`${styles.serviceVisual} ${service.visual === 'whatsapp' ? styles.greenVisual : ''}`}>{service.visual === 'website' || service.visual === 'whatsapp' ? <ChatExample whatsapp={service.visual === 'whatsapp'}/> : <TaskExample workflow={service.visual === 'workflow'}/>}</div></article>)}
    </section>
    <section className={styles.custom}><div className={styles.container}><div className={styles.customHeading}><div><p className={styles.eyebrow}>MORE POSSIBILITIES</p><h2>Need something built<br/>around your business?</h2></div><CTA secondary>Discuss Your Project</CTA></div><div className={styles.extraGrid}>{extras.map(([Icon, title, description]) => <article key={title}><Icon size={25}/><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
    <section className={`${styles.container} ${styles.journey}`}><p className={styles.eyebrow}>EXAMPLE WORKFLOW</p><h2>From enquiry to onboarding—<br/>with fewer manual steps.</h2><ol className={styles.journeySteps}>{[[MessageCircle,'A customer asks','Your chatbot answers and collects their details.'],[Users,'Your CRM updates','The enquiry becomes a customer record.'],[Bell,'Your team follows up','A task gives the right person a next step.'],[Workflow,'Onboarding begins','Once the sale is confirmed, delivery gets moving.']].map(([Icon,title,desc],i)=><li key={title}><span className={styles.journeyIcon}><Icon size={28}/></span><span className={styles.stepNumber}>0{i+1}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol><p className={styles.control}><Check size={19}/> You decide what runs automatically and what needs approval.</p></section>
    <section className={styles.approach}><div className={`${styles.container} ${styles.approachGrid}`}><div className={styles.teamImage}><Image src="/images/ai/team-collaboration.jpg" alt="Illustrative scene of a business owner and colleagues collaborating around a laptop in a bright office." fill sizes="(max-width: 800px) 100vw, 50vw"/><div className={styles.imageCaption}>Built for your business.<br/><strong>Ready for your team.</strong></div></div><div><p className={styles.eyebrow}>A PRACTICAL PATH TO LAUNCH</p><h2>Here’s how we<br/>get it working.</h2><ol className={styles.approachSteps}>{[['Show us what’s slowing you down.','Tell us what gets repeated, delayed, or missed. We define the solution, scope, and cost.'],['We build and test it.','We connect your tools and test the workflow, including when it should hand over to a person.'],['Your team takes control.','We launch, train your team, and agree on the support needed to keep it working.']].map(([title,desc],i)=><li key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div></li>)}</ol></div></div></section>
    <section className={`${styles.container} ${styles.faq}`}><div><p className={styles.eyebrow}>GOOD QUESTIONS</p><h2>A few things<br/>you might be wondering.</h2></div><div>{faqs.map(([question,answer])=><details key={question}><summary>{question}<ChevronDown size={20}/></summary><p>{answer}</p></details>)}</div></section>
    <section className={styles.finalCTA}><div className={styles.container}><p className={styles.eyebrow}>LET’S MAKE WORK FLOW</p><h2>What are you still<br/>doing manually?</h2><p>Tell us the task, the tools you use, and where things get stuck.<br/>We’ll help you define a practical solution.</p><CTA>Let’s Automate Your Business</CTA><a className={styles.email} href="mailto:ask@bloopglobal.com">Or email ask@bloopglobal.com <ArrowRight size={16}/></a></div></section>
  </main>;
}
