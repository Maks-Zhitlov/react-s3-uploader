const primaryColor = '#238bf9';
const bgColor = '#f5f9fa';
const secondaryColor = '#d8ebf1';


export default {
    box: {
        background: '#fff',
        margin: '20px 0',
        boxShadow: '0px 0px 10px rgba(34, 34, 34, 0.15)',
        padding: [[20, 40]],
        textAlign: 'left',

        '& header': {
            fontSize: 20,
            marginBottom: 30,
            borderBottom: '1px solid #dedede',
            paddingBottom: 15,
            color: '#444',
            lineHeight: 1
        },

        '&.is-drag-over': {
            '& >*': {
                pointerEvents: 'none !important'
            }
        },
    },
    dropZoneArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        outline: `2px dashed ${secondaryColor}`,
        color: '#3b7e92',
        fontSize: 16,
        borderRadius: 5,
        transition: 'all .3s ease-in-out',
        '&.is-drag-over': {
            outlineOffset: -12,
            outlineColor: '#908f8f',
            background: 'rgba(217, 236, 241, 0.25)',
        },
        '& img': {
            maxWidth: 32,
            verticalAlign: 'bottom',
            marginRight: 10,
            marginBottom: -4
        },

        '& label': {
            display: 'inline-block',
            borderBottom: '1px dashed',
            cursor: 'pointer'
        },

        '& input': {
            display: 'none !important'
        }
    },

    actionBar: {
        textAlign: 'right',
        margin: [[20, 0]],
        '& button': {
            border: 'none',
            background: '#949494',
            color: '#fff',
            padding: [[8, 16]],
            lineHeight: 1.3,
            fontSize: 14,
            fontFamily: 'inherit',
            borderRadius: 3,
            letterSpacing: 1,
            cursor: 'pointer',
            transition: 'all .1s linear',
            margin: [[0, 5]],
            // outline: 'none !important',
            '&:first-child': {
                marginLeft: 0
            },
            '&:last-child': {
                marginRight: 0
            },
            '&[role="primary"]': {
                background: '#2f92ff',
                '&:hover': {
                    background: '#1082ff',
                },
            },
            '&[role="danger"]': {
                background: '#ff615e',
                '&:hover': {
                    background: '#ff4a4a',
                },
            },
            '&[disabled]': {
                opacity: .7,
                pointerEvents: 'none'
            }
        }
    },


    filesListWrapper: {
        margin: [[20, 0]],
        maxHeight: 353,
        overflowX: 'auto'
    },

    filesList: {
        listStyle: 'none',
        padding: 0,
        color: "#333",
        width: '100%',
        margin: 0,
        borderCollapse: 'collapse',
        // border: '1px solid #e0e0e0',
        '& tr': {
            transition: 'background .3s ease-in-out',
            '& span': {
                display: 'inline-block',
                verticalAlign: 'text-bottom',
                marginRight: 4,
                '& svg': {
                    verticalAlign: 'middle',
                    fill: "#ccc",
                    transition: 'all .1s linear',
                    fillOpacity: .7,
                },
            },
            '& .statusColumn': {
                color: '#ccc',
                transition: 'color .3s ease-in-out',
                whiteSpace: 'nowrap'
            },
            '& >*': {
                border: '1px solid #e0e0e0',
                borderWidth: [[1, 0]],
                padding: [[8, 15]],
                fontSize: 13,
                width: '.25%',
                boxSizing: 'border-box',
                '&:first-child': {
                    width: '5%'
                },
                '&:last-child': {
                    textAlign: 'right'
                },
                '& button': {
                    background: 'transparent',
                    margin: [[0, 5]],
                    outline: 'none !important',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    '&:disabled': {
                        pointerEvents: 'none',
                        opacity: '.5'
                    },
                    '&:last-child': {
                        // marginRight: 0
                    },
                    '&:first-child': {
                        // marginLeft: 0
                    },
                    '& svg': {
                        verticalAlign: 'middle',
                        fill: "#333",
                        transition: 'all .1s linear',
                        fillOpacity: .7
                    },
                    '&:hover': {
                        '& svg': {
                            transform: 'scale(1.2)',
                            fillOpacity: 1
                        }
                    }
                }
            },
            '& > th': {
                padding: [[10, 15]],
                fontSize: 14,
                // background: '#f3faff'
                background: '#fafbfb'
            },
            '&:nth-child(even) > td': {
                background: '#fdfdfd'
            },
            '&.uploading-finalize': {
                '& .statusColumn': {
                    color: '#007bff'
                },
                '& span': {
                    '& svg': {
                        fill: "#007bff",
                    }
                },
            },
            '&.uploading-in-process': {
                '& .statusColumn': {
                    color: '#f0ad4e'
                },
                '& span': {
                  '& svg': {
                      fill: "#f0ad4e",
                  }
                },
                '& .loadIcon': {
                    animation: 'App-logo-spin infinite 2s linear',
                },
            },
            '&.uploading-done': {
                '& .statusColumn': {
                    color: '#46bb00'
                },
                '& span': {
                    '& svg': {
                        fill: "#46bb00",
                    }
                },
            },
            '&.uploading-fail': {
                '& .statusColumn': {
                    color: '#db2828'
                },
                '& span': {
                    '& svg': {
                        fill: "#db2828",
                    }
                },
            },
        },

        '& li': {
            marginBottom: 10,
            border: '1px solid #eaeaea',
            padding: [10, 15, 10, 60],
            borderRadius: 2,
            position: 'relative',
            '&:hover': {},
            '&:after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 5,
                top: 5,
                width: 50,
                height: 50,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                // backgroundImage: "url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU4IDU4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OCA1ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNFREVBREE7IiBwb2ludHM9IjUxLjUsMTQgMzcuNSwwIDYuNSwwIDYuNSw1OCA1MS41LDU4ICIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojQ0VDOUFFOyIgcG9pbnRzPSIzNy41LDAgMzcuNSwxNCA1MS41LDE0ICIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDRUM5QUU7IiBkPSJNMTUuNSwxNmg5YzAuNTUyLDAsMS0wLjQ0NywxLTFzLTAuNDQ4LTEtMS0xaC05Yy0wLjU1MiwwLTEsMC40NDctMSwxUzE0Ljk0OCwxNiwxNS41LDE2eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NFQzlBRTsiIGQ9Ik0zMi41LDM2aC0xN2MtMC41NTIsMC0xLDAuNDQ3LTEsMXMwLjQ0OCwxLDEsMWgxN2MwLjU1MiwwLDEtMC40NDcsMS0xUzMzLjA1MiwzNiwzMi41LDM2eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NFQzlBRTsiIGQ9Ik00Mi41LDI5aC03Yy0wLjU1MiwwLTEsMC40NDctMSwxczAuNDQ4LDEsMSwxaDdjMC41NTIsMCwxLTAuNDQ3LDEtMVM0My4wNTIsMjksNDIuNSwyOXoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDRUM5QUU7IiBkPSJNMTUuNSwyNGg1YzAuNTUyLDAsMS0wLjQ0NywxLTFzLTAuNDQ4LTEtMS0xaC01Yy0wLjU1MiwwLTEsMC40NDctMSwxUzE0Ljk0OCwyNCwxNS41LDI0eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NFQzlBRTsiIGQ9Ik0zMC41LDI0aDdjMC41NTIsMCwxLTAuNDQ3LDEtMXMtMC40NDgtMS0xLTFoLTdjLTAuNTUyLDAtMSwwLjQ0Ny0xLDFTMjkuOTQ4LDI0LDMwLjUsMjR6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQ0VDOUFFOyIgZD0iTTI0LjUsMjNjMCwwLjI2LDAuMTEsMC41MiwwLjI5LDAuNzFDMjQuOTgsMjMuODksMjUuMjQsMjQsMjUuNSwyNGMwLjI2LDAsMC41Mi0wLjExLDAuNzEtMC4yOSAgIGMwLjE4LTAuMTksMC4yOS0wLjQ1LDAuMjktMC43MWMwLTAuMjYxLTAuMTEtMC41MjEtMC4yOS0wLjcxYy0wLjM3LTAuMzctMS4wNC0wLjM3LTEuNDIsMEMyNC42MSwyMi40NzksMjQuNSwyMi43MzksMjQuNSwyM3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDRUM5QUU7IiBkPSJNMjAuNSwyOWMtMC41NTIsMC0xLDAuNDQ3LTEsMXMwLjQ0OCwxLDEsMWgxMGMwLjU1MiwwLDEtMC40NDcsMS0xcy0wLjQ0OC0xLTEtMUgyMC41eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NFQzlBRTsiIGQ9Ik0xNS41LDMxYzAuMjYsMCwwLjUyLTAuMTEsMC43MS0wLjI5YzAuMTgtMC4xOSwwLjI5LTAuNDUsMC4yOS0wLjcxYzAtMC4yNjEtMC4xMS0wLjUyMS0wLjI5LTAuNzEgICBjLTAuMzctMC4zNy0xLjA1LTAuMzctMS40MiwwYy0wLjE4LDAuMTg5LTAuMjksMC40MzktMC4yOSwwLjcxYzAsMC4yNiwwLjExLDAuNTIsMC4yOSwwLjcxQzE0Ljk4LDMwLjg5LDE1LjI0LDMxLDE1LjUsMzF6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQ0VDOUFFOyIgZD0iTTQyLjUsNDNoLTdjLTAuNTUyLDAtMSwwLjQ0Ny0xLDFzMC40NDgsMSwxLDFoN2MwLjU1MiwwLDEtMC40NDcsMS0xUzQzLjA1Miw0Myw0Mi41LDQzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NFQzlBRTsiIGQ9Ik0zMC41LDQzaC0xMGMtMC41NTIsMC0xLDAuNDQ3LTEsMXMwLjQ0OCwxLDEsMWgxMGMwLjU1MiwwLDEtMC40NDcsMS0xUzMxLjA1Miw0MywzMC41LDQzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NFQzlBRTsiIGQ9Ik0xNC43OSw0My4yOWMtMC4xOCwwLjE4LTAuMjksMC40MzktMC4yOSwwLjcxYzAsMC4yNywwLjEsMC41MiwwLjI5LDAuNzEgICBDMTQuOTgsNDQuODksMTUuMjQsNDUsMTUuNSw0NWMwLjI3LDAsMC41Mi0wLjExLDAuNzEtMC4yOWMwLjE4LTAuMTksMC4yOS0wLjQ1LDAuMjktMC43MWMwLTAuMjcxLTAuMTEtMC41MjEtMC4yOS0wLjcgICBDMTUuODQsNDIuOTIsMTUuMTcsNDIuOTIsMTQuNzksNDMuMjl6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQ0VDOUFFOyIgZD0iTTQyLjUsMjRjMC4yNiwwLDAuNTItMC4xMSwwLjcxLTAuMjljMC4xOS0wLjE5LDAuMjktMC40NSwwLjI5LTAuNzFjMC0wLjI2MS0wLjEtMC41MjEtMC4yOS0wLjcxICAgYy0wLjM4LTAuMzctMS4wNC0wLjM3LTEuNDIsMGMtMC4xOCwwLjE4OS0wLjI5LDAuNDQ5LTAuMjksMC43MWMwLDAuMjYsMC4xMSwwLjUyLDAuMjksMC43MUM0MS45OCwyMy44OSw0Mi4yNCwyNCw0Mi41LDI0eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NFQzlBRTsiIGQ9Ik0zOC4yMSwzNy43MWMwLjE4LTAuMTksMC4yOS0wLjQ1LDAuMjktMC43MWMwLTAuMjYxLTAuMTEtMC41MjEtMC4yOS0wLjcxICAgYy0wLjM4LTAuMzctMS4wNS0wLjM3LTEuNDIsMGMtMC4xOCwwLjE4OS0wLjI5LDAuNDQ5LTAuMjksMC43MWMwLDAuMjYsMC4xMSwwLjUyLDAuMjksMC43MUMzNi45OCwzNy44OTksMzcuMjMsMzgsMzcuNSwzOCAgIFMzOC4wMiwzNy44OSwzOC4yMSwzNy43MXoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDRUM5QUU7IiBkPSJNNDEuNzksMzYuMjljLTAuMTgsMC4xODktMC4yOSwwLjQ0OS0wLjI5LDAuNzFjMCwwLjI2LDAuMTEsMC41MiwwLjI5LDAuNzEgICBDNDEuOTgsMzcuODksNDIuMjMsMzgsNDIuNSwzOHMwLjUyLTAuMTEsMC43MS0wLjI5YzAuMTgtMC4xOSwwLjI5LTAuNDUsMC4yOS0wLjcxYzAtMC4yNjEtMC4xMS0wLjUyMS0wLjI5LTAuNzEgICBDNDIuODQsMzUuOTIsNDIuMTYsMzUuOTIsNDEuNzksMzYuMjl6Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==)"
                backgroundImage: "url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0Y4RjhGOTsiIHBvaW50cz0iMzM0Ljc2OSw2MS44OSA3NS45NTYsNjEuODkgNzUuOTU2LDUxMiA0MzYuMDQ0LDUxMiA0MzYuMDQ0LDE2My4xNjUgIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNFREVERUQ7IiBwb2ludHM9IjMzNC43NjksMTYzLjE2NSAzMzQuNzY5LDYxLjg5IDI1Niw2MS44OSAyNTYsNTEyIDQzNi4wNDQsNTEyIDQzNi4wNDQsMTYzLjE2NSAiLz4KPHJlY3QgeD0iMTQzLjQ3MyIgeT0iMjY0LjQ0IiBzdHlsZT0iZmlsbDojRDFFNUY1OyIgd2lkdGg9IjIyNS4wNTUiIGhlaWdodD0iMTgwLjA0NCIvPgo8cmVjdCB4PSIyNTYiIHk9IjI2NC40NCIgc3R5bGU9ImZpbGw6I0I0RDhGMTsiIHdpZHRoPSIxMTIuNTI3IiBoZWlnaHQ9IjE4MC4wNDQiLz4KPHBvbHlnb24gc3R5bGU9ImZpbGw6Izk1RDVBNzsiIHBvaW50cz0iMjQ0Ljc0NywzOTkuNDczIDE5OS43MzYsMzU0LjQ2MiAxNDMuNDczLDQxMC43MjUgMTQzLjQ3Myw0NDQuNDg0IDM2OC41MjcsNDQ0LjQ4NCAgIDM2OC41MjcsMzg4LjIyIDMxMi4yNjQsMzMxLjk1NiAiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0Y4RTk5QjsiIGQ9Ik0xOTkuNzM2LDMyMC43MDNjLTEyLjQxLDAtMjIuNTA1LTEwLjA5Ni0yMi41MDUtMjIuNTA1YzAtMTIuNDEsMTAuMDk2LTIyLjUwNSwyMi41MDUtMjIuNTA1ICBzMjIuNTA2LDEwLjA5NiwyMi41MDYsMjIuNTA1YzAuMDAyLDYuMDA4LTIuMzM5LDExLjY2Mi02LjU5MiwxNS45MTVDMjExLjM5OSwzMTguMzYzLDIwNS43NDcsMzIwLjcwMywxOTkuNzM2LDMyMC43MDN6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNEOEQ4REE7IiBkPSJNMTcxLjYwNCwyMDIuNTQ5Yy0yNy45MjEsMC01MC42MzctMjIuNzE1LTUwLjYzNy01MC42Mzd2LTQ1LjAxMWgzMy43NTh2NDUuMDExICBjMCw5LjMwNyw3LjU3MiwxNi44NzksMTYuODc5LDE2Ljg3OXMxNi44NzktNy41NzIsMTYuODc5LTE2Ljg3OVY2MS44OWMwLTE1LjUxMi0xMi42Mi0yOC4xMzItMjguMTMyLTI4LjEzMiAgUzEzMi4yMiw0Ni4zNzgsMTMyLjIyLDYxLjg5SDk4LjQ2MmMwLTM0LjEyNiwyNy43NjQtNjEuODksNjEuODktNjEuODlzNjEuODksMjcuNzY0LDYxLjg5LDYxLjg5djkwLjAyMiAgQzIyMi4yNDIsMTc5LjgzNSwxOTkuNTI2LDIwMi41NDksMTcxLjYwNCwyMDIuNTQ5eiIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojODBDQjkzOyIgcG9pbnRzPSIzNjguNTI3LDM4OC4yMiAzMTIuMjY0LDMzMS45NTYgMjU2LDM4OC4yMiAyNTYsNDQ0LjQ4NCAzNjguNTI3LDQ0NC40ODQgIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)"
            },
            '& p': {
                margin: [0, 0, 7, 0],
                '& em': {
                    fontStyle: 'italic',
                    opacity: .7,
                    fontSize: '.9em'
                },
                '&:last-child': {
                    marginBottom: 0
                }
            }
        }
    },
}