import React, {useReducer, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axiosOrder from "../axiosOrder";
import {AppBar, Container, Toolbar, Typography, TextField, Box} from "@material-ui/core";


const INPUT_TEXT = "INPUT_TEXT";
const FETCH_SHOWS = "FETCH_SHOWS";
const CLEAN_FIELD = "CLEAN_FIELD"

const initialState = {
    name: '',
    shows: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case INPUT_TEXT:
            return {
                ...state,
                name: action.value
            }
        case FETCH_SHOWS:
            return {
                ...state,
                shows: action.value
            }
        case CLEAN_FIELD:
            return {
                ...state,
                name: ''
            }
        default:
            return state
    }
};

const Header = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const inputTextHandler = (event) => {
        dispatch({type: INPUT_TEXT, value: event.target.value});
    };

    const cleanInputHandler = () => {
        dispatch({type: CLEAN_FIELD});
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosOrder(state.name);
            dispatch({type: FETCH_SHOWS, value: response.data})
        };
        fetchData().catch(console.error);
    }, [state.name]);

    const shows = state.shows.map(show => {
        return (
            <Box>
                <NavLink to={/shows/ + show.show.id}
                         key={show.show.id}
                         style={{
                             color: "#868686",
                             textDecoration: "none",
                             textTransform: "uppercase",
                             fontSize: "18px",
                         }}
                         onClick={cleanInputHandler}
                >{show.show.name}</NavLink>
            </Box>
        )
    })

    return (
        <>
            <AppBar>
                <Container fixed>
                    <Toolbar>
                        <Typography variant="h4">
                            TV Shows
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container fixed>
                <TextField
                    id="outlined-basic"
                    label="Search for TV show"
                    variant="outlined"
                    value={state.name}
                    onChange={inputTextHandler}
                    style={{
                        marginTop: "100px",
                        width: "100%"
                    }}
                />
                <Box style={{
                    position: "absolute",
                    background: "lightblue",
                    borderRadius: "3px",
                    width: "300px",
                    padding: "0 20px",
                    margin: "20px"
                }}>
                    {shows}
                </Box>
            </Container>
        </>
    );
};

export default Header;