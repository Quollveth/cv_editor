import { PDFViewer } from '@react-pdf/renderer';

import { Document, Page } from '@react-pdf/renderer';
import { CvInfoPdf, CvToPdf } from './data';
import ContactLink from './parts/contact';
import { useContext } from 'react';
import { SettingsContext } from '../../settings';
import { CvInfo } from '../../data';

const Resume = ({ resume }: { resume: CvInfoPdf }) => (
    <Document>
        <Page>
            {resume.contact.map((c, i) => (
                <ContactLink key={i} contact={c} />
            ))}
        </Page>
    </Document>
);

const CvPdf = (resume: CvInfo) => {
    const [settings] = useContext(SettingsContext);

    let pdfCv: CvInfoPdf;
    try {
        pdfCv = CvToPdf(resume, settings.language);
    } catch (e) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p>Error loading PDF</p>
                <p>{`${e}`}</p>
            </div>
        );
    }

    return (
        <PDFViewer className="h-full w-full">
            <Resume resume={pdfCv} />
        </PDFViewer>
    );
};

export default CvPdf;
