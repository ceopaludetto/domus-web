import React, { Fragment } from 'react';
import { MdClose } from 'react-icons/md';

import Button from '../components/Form/Button';
import Grow from '../components/Grid/Grow';
import Bold from '../components/Typo/Bold';

export function makeToast(msg, undo, close) {
    return (
        <Fragment>
            <Grow>
                <Bold variant="white" helper>
                    {msg}
                </Bold>
            </Grow>
            {undo && (
                <Button icon onClick={undo}>
                    Desfazer
                </Button>
            )}
            <Button icon rounded onClick={close}>
                <MdClose />
            </Button>
        </Fragment>
    );
}
