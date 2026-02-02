// Facebook Pixel Event Tracking Utility
// Documentation: https://developers.facebook.com/docs/meta-pixel/reference

// Extend the Window interface to include fbq
declare global {
    interface Window {
        fbq: (...args: any[]) => void;
    }
}

// Standard Events
export const FB_PIXEL_EVENTS = {
    // Lead Generation
    LEAD: 'Lead',
    COMPLETE_REGISTRATION: 'CompleteRegistration',
    CONTACT: 'Contact',
    SUBMIT_APPLICATION: 'SubmitApplication',

    // Content Events
    VIEW_CONTENT: 'ViewContent',
    SEARCH: 'Search',

    // E-commerce Events
    ADD_TO_CART: 'AddToCart',
    ADD_TO_WISHLIST: 'AddToWishlist',
    INITIATE_CHECKOUT: 'InitiateCheckout',
    ADD_PAYMENT_INFO: 'AddPaymentInfo',
    PURCHASE: 'Purchase',

    // Engagement Events
    SUBSCRIBE: 'Subscribe',
    START_TRIAL: 'StartTrial',
    SCHEDULE: 'Schedule',
    CUSTOMIZE_PRODUCT: 'CustomizeProduct',
    FIND_LOCATION: 'FindLocation',
    DONATE: 'Donate',
} as const;

type PixelEventName = typeof FB_PIXEL_EVENTS[keyof typeof FB_PIXEL_EVENTS] | string;

interface EventParams {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    value?: number;
    currency?: string;
    num_items?: number;
    search_string?: string;
    status?: string;
    [key: string]: any;
}

/**
 * Check if Facebook Pixel is available
 */
export const isFbPixelAvailable = (): boolean => {
    return typeof window !== 'undefined' && typeof window.fbq === 'function';
};

/**
 * Track a standard Facebook Pixel event
 * @param eventName - The name of the event (use FB_PIXEL_EVENTS constants)
 * @param params - Optional event parameters
 */
export const trackEvent = (eventName: PixelEventName, params?: EventParams): void => {
    if (!isFbPixelAvailable()) {
        console.warn('Facebook Pixel not available');
        return;
    }

    if (params) {
        window.fbq('track', eventName, params);
    } else {
        window.fbq('track', eventName);
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[FB Pixel] Event tracked: ${eventName}`, params || '');
    }
};

/**
 * Track a custom event (for events not in the standard list)
 * @param eventName - Custom event name
 * @param params - Optional event parameters
 */
export const trackCustomEvent = (eventName: string, params?: EventParams): void => {
    if (!isFbPixelAvailable()) {
        console.warn('Facebook Pixel not available');
        return;
    }

    if (params) {
        window.fbq('trackCustom', eventName, params);
    } else {
        window.fbq('trackCustom', eventName);
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[FB Pixel] Custom event tracked: ${eventName}`, params || '');
    }
};

// ===============================
// Pre-built Event Functions
// ===============================

/**
 * Track when a visitor submits a contact form
 */
export const trackContactFormSubmit = (formName?: string): void => {
    trackEvent(FB_PIXEL_EVENTS.LEAD, {
        content_name: formName || 'Contact Form',
        content_category: 'Contact',
    });
};

/**
 * Track when someone subscribes to newsletter
 */
export const trackNewsletterSignup = (source?: string): void => {
    trackEvent(FB_PIXEL_EVENTS.SUBSCRIBE, {
        content_name: source || 'Newsletter',
        content_category: 'Email Subscription',
    });
};

/**
 * Track when someone registers/signs up
 */
export const trackRegistration = (method?: string): void => {
    trackEvent(FB_PIXEL_EVENTS.COMPLETE_REGISTRATION, {
        content_name: method || 'Website Registration',
        status: 'complete',
    });
};

/**
 * Track when someone views a specific page/content
 */
export const trackContentView = (contentName: string, contentCategory?: string, value?: number): void => {
    trackEvent(FB_PIXEL_EVENTS.VIEW_CONTENT, {
        content_name: contentName,
        content_category: contentCategory,
        value: value,
        currency: 'USD',
    });
};

/**
 * Track when someone initiates a booking/consultation
 */
export const trackBookingInitiated = (serviceName?: string): void => {
    trackEvent(FB_PIXEL_EVENTS.SCHEDULE, {
        content_name: serviceName || 'Consultation Booking',
        content_category: 'Booking',
    });
};

/**
 * Track when someone submits an application (e.g., Vanguard, careers)
 */
export const trackApplicationSubmit = (programName: string): void => {
    trackEvent(FB_PIXEL_EVENTS.SUBMIT_APPLICATION, {
        content_name: programName,
        content_category: 'Application',
    });
};

/**
 * Track a purchase
 */
export const trackPurchase = (value: number, currency: string = 'USD', contentName?: string): void => {
    trackEvent(FB_PIXEL_EVENTS.PURCHASE, {
        value: value,
        currency: currency,
        content_name: contentName,
    });
};

/**
 * Track a search action
 */
export const trackSearch = (searchQuery: string): void => {
    trackEvent(FB_PIXEL_EVENTS.SEARCH, {
        search_string: searchQuery,
    });
};

/**
 * Track course enrollment
 */
export const trackCourseEnrollment = (courseName: string, value?: number): void => {
    trackEvent(FB_PIXEL_EVENTS.START_TRIAL, {
        content_name: courseName,
        content_category: 'Course',
        value: value,
        currency: 'USD',
    });
};
