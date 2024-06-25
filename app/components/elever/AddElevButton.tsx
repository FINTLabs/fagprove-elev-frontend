import { Button, Modal, TextField } from "@navikt/ds-react";
import { useRef } from "react";
import { PersonPlusIcon } from "@navikt/aksel-icons";

export default function AddElevButton() {
    const ref = useRef<HTMLDialogElement>(null);

    return (
        <div>
            <Button icon={<PersonPlusIcon />} onClick={() => ref.current?.showModal()}>Legg til elev</Button>

            <Modal ref={ref} header={{ heading: "Legg til elev" }} width={400}>
                <Modal.Body>
                    <form method="dialog" id="skjema" onSubmit={() => alert("onSubmit")} className="flex gap-2 flex-col">
                        <TextField label="Fult Navn" />
                        <TextField label="Fødselsnummer" inputMode="numeric" pattern="\d{11}" maxLength={11} />
                        <TextField label="Email" type="email" />
                        <TextField label="Telefonnummer" inputMode="numeric" pattern="\d{8}" maxLength={8} />
                        <TextField label="Karakter Gjenomsnitt" inputMode="decimal" pattern="^\d+(\.\d{1,2})?$" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button form="skjema">Send</Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => ref.current?.close()}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
