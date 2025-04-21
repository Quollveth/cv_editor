import { View, Link, StyleSheet } from '@react-pdf/renderer';
import { ContactPdf } from '../data';

// Create styles for the component
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    logo: {
        width: 12,
        height: 12,
        marginRight: 8,
    },
    url: {
        fontSize: 10,
        color: '#3b82f6',
        textDecoration: 'none',
    },
});

const ContactLink = ({ contact }: { contact: ContactPdf }) => {
    const Logo = contact.logo;

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Logo />
            </View>
            <Link src={contact.url} style={styles.url}>
                {contact.url}
            </Link>
        </View>
    );
};

export default ContactLink;
