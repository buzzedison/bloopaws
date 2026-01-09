export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

export const pageview = () => {
    window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
    if (window.fbq) {
        window.fbq('track', name, options)
    }
}

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
