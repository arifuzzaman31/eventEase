import { useRouter } from 'next/router';

export default function EventDetail() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Event Details for Event ID: {id}</h1>
        </div>
    );
}
