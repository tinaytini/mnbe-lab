/**
 * `modal` is a parallel-route slot (see ./@modal). When a card on /people is
 * clicked, /people/[slug] is intercepted and rendered here as an overlay,
 * while the grid stays visible underneath.
 */
export default function PeopleLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}
