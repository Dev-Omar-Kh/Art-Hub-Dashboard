import React, { useEffect, useState, useCallback, useRef } from 'react'
import WarningBox from '../pop-up/warning-box/WarningBox';
import PopUp from '../pop-up/PopUp';
import { useApiMutation } from '../../hooks/useApiMutation';
import { useQueryClient } from '@tanstack/react-query';
import ResponseBox from '../pop-up/response-box/ResponseBox';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function DeleteOperation({
    setIsOpen, endPoint, title, msg, tableName, 
    successMsg, errorMsg, method, icon, iconColor,
    isInput = false, inputSetup, formikConfig, goTo = null
}) {

    const [isConfirm, setIsConfirm] = useState(false);
    const [showMainDialog, setShowMainDialog] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [values, setValues] = useState(null);

    const navigate = useNavigate();
    const useMutation = useApiMutation();
    const useMutationRef = useRef(useMutation);
    const queryClient = useQueryClient();

    useMutationRef.current = useMutation;

    const handleClose = useCallback(() => {
        setIsConfirm(false);
        setShowMainDialog(false);
    }, []);

    useEffect(() => {
        if (isConfirm && !useMutationRef.current.isPending) {
            useMutationRef.current.mutate({
                method: method,
                endpoint: endPoint,
                ...(isInput ? { data: values } : {})
            });
        }
    }, [isConfirm, endPoint, method, isInput, values]);

    useEffect(() => {

        if (useMutation.isSuccess && useMutation.data?.success) {
            handleClose();
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                queryClient.invalidateQueries([tableName]);
                setTimeout(() => {
                    setIsOpen(false);
                    navigate(goTo);
                }, 300);
            }, 2500);
        }

        if (useMutation.isError) {
            handleClose();
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setTimeout(() => {setIsOpen(false)}, 300);
            }, 2700);
        }

    }, [
        useMutation.isSuccess, useMutation.isPending, useMutation.isError, 
        useMutation.data, tableName, handleClose, queryClient, setIsOpen, goTo, navigate
    ]);

    return <React.Fragment>

        <AnimatePresence>

            {showMainDialog && <PopUp key={'main'} onClose={handleClose}>
                <WarningBox 
                    icon={icon} iconColor={iconColor}
                    confirm={setIsConfirm}
                    title={title} 
                    msg={msg} setValues={setValues}
                    onClose={handleClose}
                    isLoading={useMutation.isPending} formikConfig={isInput ? formikConfig : null}
                    isInput={isInput} inputSetup={isInput ? inputSetup : null}
                />
            </PopUp>}

            {showSuccess && <PopUp key={'success'}><ResponseBox type={true} msg={successMsg} /></PopUp>}
            {showError && <PopUp key={'error'}><ResponseBox type={false} msg={errorMsg} /></PopUp>}

        </AnimatePresence>

    </React.Fragment>
}