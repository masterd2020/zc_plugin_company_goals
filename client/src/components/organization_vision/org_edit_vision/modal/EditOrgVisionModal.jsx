import React, { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrgVision } from '../../../../redux/organizationVision.slice';
import {
  EditVisionModal,
  EditVisionContainer,
  Header,
  TextBox,
  ActionButtonsContainer,
  ActionButton,
  ActionCancelEditVisionButton,
} from './EditOrgVision.styled';

const OrganizationVisionEditModal = () => {
  const dispatch = useDispatch();
  const { visionText, status, showVisionModal } = useSelector((state) => state.organizationVision);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    setEditText(visionText);
  }, [visionText]);

  const dispatchAction = () => {
    if (editText) {
      dispatch(updateOrgVision(editText));
    }
  };

  return (
    <EditVisionModal
      aria-labelledby="organization-vision-modal"
      aria-describedby="edit-organization-vision-modal"
      open={showVisionModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={showVisionModal}>
        <EditVisionContainer>
          <Header id="transition-modal-title">Edit Vision</Header>
          <TextBox placeholder="Click to edit..." value={editText} onChange={(e) => setEditText(e.target.value)} />
          <ActionButtonsContainer>
            {/* <ActionCancelEditVisionButton disabled={loading} onClick={() => dispatch(showEditVisionModal())}>
              Cancel
            </ActionCancelEditVisionButton> */}
            <ActionButton
              disabled={status === 'loading'}
              onClick={() => {
                dispatchAction();
              }}
            >
              {status === 'loading' ? 'please wait' : 'save'}
            </ActionButton>
          </ActionButtonsContainer>
        </EditVisionContainer>
      </Fade>
    </EditVisionModal>
  );
};

export default OrganizationVisionEditModal;
