import { Social } from '../../data.tsx';
import { JSX } from 'react';

import Email from './social/email.tsx';
import Bluesky from './social/bluesky.tsx';
import GitHub from './social/github.tsx';
import LinkedIn from './social/linkedin.tsx';
import WhatsApp from './social/whatsapp.tsx';
import Instagram from './social/instagram.tsx';

export { Bluesky, GitHub, LinkedIn, WhatsApp, Email, Instagram };

// prettier-ignore
export function getSocialLogo(which: Social): (props: any) => JSX.Element {
    switch (which) {
        case 'email': return Email;
		case 'github': return GitHub;
        case 'linkedin': return LinkedIn;
        case 'instagram': return Instagram;
        case 'bluesky': return Bluesky;
        case 'whatsapp': return WhatsApp;
        default: return Email;
    }
}

// prettier-ignore
export function getSocialPrefix(which: Social): string {
    switch (which) {
        case 'email': return 'mailto:';
        case 'github': return 'https://github.com/';
        case 'linkedin': return 'https://linkedin.com/in/';
        case 'instagram': return 'https://instagram.com/';
        case 'bluesky': return 'https://bsky.app/profile/';
        case 'whatsapp': return 'https://wa.me/';
        default: return '';
    }
}
