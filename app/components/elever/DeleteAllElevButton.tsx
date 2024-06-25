import { BodyLong, Button, Modal } from "@navikt/ds-react";
import { TrashIcon } from "@navikt/aksel-icons";
import { useState } from "react";
import { useFetcher } from "@remix-run/react";

export default function DeleteAllElevButton() {
    const [open, setOpen] = useState(false);
    const fetcher = useFetcher();

    const handleDelete = () => {
        fetcher.submit(null, { method: "delete", action: "." });
        setOpen(false);
    };

    return (
        <>
            <Button variant="secondary" icon={<TrashIcon />} onClick={() => setOpen(true)}>Slett alle</Button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                header={{
                    heading: "Er du sikker?",
                    size: "small",
                    closeButton: false,
                }}
                width="small"
            >
                <Modal.Body>
                    <BodyLong>
                        Når du sletter alle elever, kan denne handlingen ikke angres, og din e-postadresse vil bli
                        loggført i systemet som en del av handlingen.
                    </BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="danger" onClick={handleDelete}>
                        Ja, jeg er sikker
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setOpen(false)}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
