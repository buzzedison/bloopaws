export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

export const pageview = () => {
    if (window.fbq) {
        window.fbq('track', 'PageView')
    }
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
    if (window.fbq) {
        window.fbq('track', name, options)
        if (process.env.NODE_ENV === 'development') {
            console.log(`[FB Pixel] Event: ${name}`, options)
        }
    }
}

// Custom events (for non-standard events)
export const customEvent = (name, options = {}) => {
    if (window.fbq) {
        window.fbq('trackCustom', name, options)
        if (process.env.NODE_ENV === 'development') {
            console.log(`[FB Pixel] Custom Event: ${name}`, options)
        }
    }
}

// ========== Pre-built Event Functions ==========

// Track newsletter/email signup
export const trackNewsletterSignup = (source = 'Newsletter') => {
    event('Subscribe', {
        content_name: source,
        content_category: 'Email Subscription',
    })
    ga_event('newsletter_signup', 'engagement', source)
}

// Track lead/contact form submission
export const trackLead = (formName = 'Contact Form', category = 'Contact') => {
    event('Lead', {
        content_name: formName,
        content_category: category,
    })
    ga_event('lead_form_submit', 'engagement', formName)
}

// Track course/program enrollment
export const trackEnrollment = (courseName, value = 0) => {
    event('StartTrial', {
        content_name: courseName,
        content_category: 'Course',
        value: value,
        currency: 'USD',
    })
    ga_event('course_enrollment', 'engagement', courseName, value)
}

// Track booking/consultation request
export const trackBooking = (serviceName = 'Consultation') => {
    event('Schedule', {
        content_name: serviceName,
        content_category: 'Booking',
    })
    ga_event('booking_request', 'engagement', serviceName)
}

// Track purchase
export const trackPurchase = (value, currency = 'USD', contentName = 'Purchase') => {
    event('Purchase', {
        value: value,
        currency: currency,
        content_name: contentName,
    })
    ga_event('purchase', 'ecommerce', contentName, value)
}

// Track content view (for specific pages/articles)
export const trackContentView = (contentName, category = 'Content') => {
    event('ViewContent', {
        content_name: contentName,
        content_category: category,
    })
    ga_event('view_content', 'engagement', contentName)
}

// Track search
export const trackSearch = (searchQuery) => {
    event('Search', {
        search_string: searchQuery,
    })
    ga_event('search', 'engagement', searchQuery)
}

// Track application submission (jobs, programs)
export const trackApplication = (programName) => {
    event('SubmitApplication', {
        content_name: programName,
        content_category: 'Application',
    })
    ga_event('application_submit', 'engagement', programName)
}

// Track add to cart
export const trackAddToCart = (itemName, value = 0, currency = 'USD') => {
    event('AddToCart', {
        content_name: itemName,
        value: value,
        currency: currency,
    })
    ga_event('add_to_cart', 'ecommerce', itemName, value)
}

// Track initiate checkout
export const trackInitiateCheckout = (value = 0, currency = 'USD', numItems = 1) => {
    event('InitiateCheckout', {
        value: value,
        currency: currency,
        num_items: numItems,
    })
    ga_event('begin_checkout', 'ecommerce', 'checkout', value)
}

// ========== Google Analytics ==========

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const ga_event = (action, category, label, value) => {
    if (window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}
