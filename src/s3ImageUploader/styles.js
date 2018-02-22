export default {
    '@global': {
        'body.ReactModal__Body--open': {
            overflow: 'hidden'
        }
    },
    box: {
        background: '#fff',
        margin: '20px 0',
        boxShadow: '0px 0px 10px rgba(34, 34, 34, 0.15)',
        padding: [[20, 40]],
        textAlign: 'left',
        '@media (max-width: 639px)': {
            padding: [[20, 15]],
        },
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
        outline: `2px dashed #d8ebf1`,
        color: '#3b7e92',
        fontSize: 16,
        borderRadius: 5,
        transition: 'all .3s ease-in-out',
        '@media (max-width: 639px)': {
            textAlign: 'center',
            '& img': {
                display: 'block',
                margin: '0 auto 8px',
            },
        },
        '&.is-drag-over': {
            outlineOffset: -12,
            outlineColor: '#908f8f',
            background: 'rgba(217, 236, 241, 0.25)',
        },
        '& img': {
            maxWidth: 32,
            verticalAlign: 'bottom',
            marginRight: 10,
            marginBottom: -4,
            '@media (max-width: 639px)': {
                display: 'block',
                margin: '0 auto 8px',
            },
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
        '@media (max-width: 639px)': {
            border: '1px solid #e0e0e0',
        },
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
                whiteSpace: 'nowrap',
                '@media (max-width: 639px)': {
                    padding: [[8, 4]],
                },
                '&:first-child': {
                    width: '5%',
                    whiteSpace: 'normal',
                    '@media (max-width: 639px)': {
                        width: '15%'
                    }
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
                    '& svg': {
                        verticalAlign: 'middle',
                        fill: "#333",
                        transition: 'all .1s linear',
                        fillOpacity: .7,
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
                    animation: 'ExampleApp-logo-spin infinite 2s linear',
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
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, .55)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
    },
    modal: {
        outline: 'none',
        background: 'transparent',
        textAlign: 'center',
    },

    modalItem: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        padding: [[0, 10]],
        '@media (max-width: 639px)': {
            height: 'auto',
        },
        '& img': {
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            border: '3px solid #fff',
        }
    },

    modalClose: {
        margin: [0],
        outline: 'none !important',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        position: 'absolute',
        right: 8,
        top: 8,
        background: 'transparent',
        width: 30,
        height: 30,
        transition: 'transform .1s linear',
        '& svg': {
            display: 'block',
            margin: '0 auto',
            fill: '#fff',
            transition: 'all .1s linear',
            fillOpacity: .7,
        },
        '&:hover': {
            transform: 'scale(1.15)',
            '& svg': {
                fillOpacity: 1,
            },
        }
    },
}