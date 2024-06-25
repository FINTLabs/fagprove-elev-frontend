import {BodyLong, Button, Modal} from "@navikt/ds-react";
import {useFetcher} from "@remix-run/react";

export default function DeleteElevModal({deleteOpen, setDeleteOpen, id}) {
    const fetcher = useFetcher();

    return (
        <>
            <Modal
                open={deleteOpen}
                header={{
                    heading: "Er du sikker?",
                    size: "small",
                    closeButton: false,
                }}
                onClose={() => setDeleteOpen(false)}
                width="small"
            >
                <Modal.Body>
                    <BodyLong>
                        Når du sletter eleven, kan denne handlingen ikke angres, og din e-postadresse vil bli
                        loggført i systemet som en del av handlingen.
                    </BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <fetcher.Form id="deleteById" method="delete">
                        <input type="hidden" name="id" value={id || ""}/>
                        <input type="hidden" name="_method" value="deleteById"/>
                    </fetcher.Form>
                    <Button variant="danger" form="deleteById" onClick={() => setDeleteOpen(false)}>
                        Ja, jeg er sikker
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setDeleteOpen(false)}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}