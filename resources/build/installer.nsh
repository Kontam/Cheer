!macro customHeader
    !system "echo '' > ${BUILD_RESOURCES_DIR}/customHeader"
!macroend

!macro preInit
    ; This macro is inserted at the beginning of the NSIS .OnInit callback
    !system "echo '' > ${BUILD_RESOURCES_DIR}/preInit"
!macroend

!macro customInit
    !system "echo '' > ${BUILD_RESOURCES_DIR}/customInit"
!macroend

!macro customInstall
    !system "echo '' > ${BUILD_RESOURCES_DIR}/customInstall"

    DetailPrint "Register cheer-kontam URI Handler"
    DeleteRegKey HKCR "cheer-kontam"
    WriteRegStr HKCR "cheer-kontam" "" "URL:cheer-kontam"
    WriteRegStr HKCR "cheer-kontam" "URL Protocol" ""
    WriteRegStr HKCR "cheer-kontam" "EveHQ NG SSO authentication Protocol" ""
    WriteRegStr HKCR "cheer-kontam\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
    WriteRegStr HKCR "cheer-kontam\shell" "" ""
    WriteRegStr HKCR "cheer-kontam\shell\Open" "" ""
    WriteRegStr HKCR "cheer-kontam\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend

!macro customInstallMode
    # set $isForceMachineInstall or $isForceCurrentInstall
    # to enforce one or the other modes.
!macroend

