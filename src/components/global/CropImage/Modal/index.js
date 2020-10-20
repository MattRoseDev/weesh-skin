import React from "react";
import AvatarEditor from "react-avatar-editor";
import styled from "styled-components";
import Buttons from "./Buttons";
import Button from "Root/components/global/Button";
import Loader from "Root/components/global/Loader";
import StyledComponents from "Root/StyledComponents";
import { EditProfileContext } from "Root/contexts/editProfile";
import { AuthContext } from "Root/contexts/auth";
import { SnackBarContext } from "Root/contexts/snackbar";
import { useMutation } from "@apollo/react-hooks";
import api from "Root/api";
import C from "Root/constants";

const StyledContainer = styled.div`
  width: 100%;
  ${C.styles.flex.flexColumnCenter};
`;

const StyledFrame = styled.div`
  position: relative;
`;

const StyledLoadingContainer = styled.div`
  ${C.styles.flex.flexColumnCenter};
  ${C.styles.position.positionAbsoluteZiro};
  background: rgba(0, 0, 0, 0.9);
`;

const StyledLoadingTitle = styled.div`
  padding: 1rem 0 0;
  font-size: 0.85rem;
  color: white;
`;

const StyledAvatarEditor = styled(AvatarEditor)`
  width: ${({ width }) => `${width}px` || "unset"} !important;
  height: ${({ height }) => `${height}px` || "unset"} !important;
  background: ${({ theme }) => theme.colors.black};
`;

const initialState = {
  image: null,
  scale: 1,
  position: null,
};

export default props => {
  const { editProfile, dispatch } = React.useContext(EditProfileContext);
  const { auth, dispatch: authDispatch } = React.useContext(AuthContext);
  const { snackbar, dispatch: snackbarDispatch } = React.useContext(
    SnackBarContext,
  );
  const [state, setState] = React.useState(initialState);
  const [newImage, setNewImage] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [singleUpload, { data, loading, error, called }] = useMutation(
    api.uploadFile.single,
  );
  let file = React.createRef();
  let cropper = React.createRef();
  const handleLoadImage = e => {
    setState(prevState => {
      return {
        ...prevState,
        image: e.currentTarget.files[0],
      };
    });
  };

  const handlePositionChange = e => {
    setState(prevState => {
      return {
        ...prevState,
        position: e,
      };
    });
  };

  const handleUploadImage = () => {
    let res = cropper.current.getImageScaledToCanvas();
    let canvas = res.toDataURL();
    setNewImage(res.toDataURL());
    setIsUploading(true);
    singleUpload({
      variables: {
        file: base64toFile(canvas, file.current.files[0].name),
        type: props.type,
      },
    });
  };

  // ZoomIn and ZoomOut
  const handleOnWheel = e => {
    if (Math.sign(e.deltaY) == -1) {
      setState(prevState => {
        return {
          ...prevState,
          scale: prevState.scale + 0.09,
        };
      });
    } else {
      setState(prevState => {
        return {
          ...prevState,
          scale: prevState.scale > 1 ? prevState.scale - 0.09 : 1,
        };
      });
    }
  };

  React.useEffect(() => {
    if (!state.image) {
      file.current.click();
    }
    if (data && called) {
      props.setCropImage(prevState => ({
        ...prevState,
        visible: false,
      }));
      dispatch({
        type: "EDIT_PROFILE",
        data: {
          [props.type]: data.singleUpload.filePath,
        },
      });
      authDispatch({
        type: "LOGIN",
        data: {
          [props.type]: data.singleUpload.filePath,
        },
      });
      snackbarDispatch({
        type: "SET_DATA",
        data: {
          icon: "Image",
          message: "Your image uploaded successfully.",
          background: "foreground",
          visible: true,
        },
      });
      setTimeout(() => {
        snackbarDispatch({ type: "HIDE" });
      }, 3 * 1000);
    }
  }, [state.image, data]);

  const base64toFile = (base64String, filename) => {
    let arr = base64String.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime,
    });
  };

  return (
    <StyledContainer>
      <input hidden type="file" ref={file} onChange={e => handleLoadImage(e)} />
      <StyledFrame>
        {isUploading && (
          <StyledLoadingContainer background="rgba(0,0,0,0.5)">
            <Loader size={40} strokeWidth={1.5} color="white" />
            <StyledLoadingTitle>Uploading</StyledLoadingTitle>
          </StyledLoadingContainer>
        )}
        <StyledAvatarEditor
          ref={cropper}
          image={state.image}
          scale={state.scale}
          width={props.width / 2}
          height={props.height / 2}
          borderRadius={props.type == "avatarAddress" ? 500 : 0}
          onPositionChange={e => handlePositionChange(e)}
          onWheel={e => handleOnWheel(e)}
          disableBoundaryChecks={false}
          disableHiDPIScaling={false}
        />
      </StyledFrame>
      <Button
        clickEvent={() => file.current.click()}
        background="white"
        color="black"
        radius="50rem"
        padding=".5rem 1rem"
        margin="1rem 0 0">
        {C.txts.en.cropImage.chooseFile}
      </Button>
      <Buttons {...props} uploadFunc={handleUploadImage} />
    </StyledContainer>
  );
};
