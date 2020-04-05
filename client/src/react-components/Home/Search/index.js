import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    Typography,
    ButtonBase,
    TextField,
    Button,
    Divider
} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { Redirect } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Avatar from "@material-ui/core/Avatar";
import date from "date-and-time";
import api from "../../../api";

import "./styles.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            isFiltered: false,
            filters: {
                keywords: "",
                type: "",
                category: [],
                deadline: {},
                duration: []
            },
            switches: [true, true, false, true, true],
            selectedResearch: {}
        };
        this.listGenerator.bind(this);
        this.applyFilters.bind(this);
        this.getCategoryOptions.bind(this);
        this.getTermOptions.bind(this);
        this.researchInfo.bind(this);
        this.displayList.bind(this);
        this.parseResearches.bind(this);
        this.sortList.bind(this);
    }

    // Parse researches obtained from databse.
    parseResearches(list) {
        const result = [];
        for (let i = 0; i < list.length; i++) {
            const name = list[i].firstName.concat(" ", list[i].lastName);
            if (name.localeCompare("leo leo") === 0) {
                continue; // hardcoding to avoid adding test account
            }
            for (let j = 0; j < list[i].postings.length; j++) {
                const research = list[i].postings[j];
                const parsedResearch = {
                    title: research.title,
                    description: research.description,
                    researcher: name,
                    duration: research.term,
                    deadline: research.deadline,
                    category: research.areaOfStudy,
                    positions: research.positions,
                    id: research._id,
                    email: list[i].email
                };
                result.push(parsedResearch);
            }
        }
        return result;
    }

    componentDidMount() {
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        api.getSession(sessionId).then((response) => {
            if (!response.data.success) {
                return this.props.history.push("/signOut");
            }
            api.getAllResearches().then((res) => {
                if (res.data.success) {
                    const allResearches = this.parseResearches(res.data.data);
                    this.setState({
                        list: allResearches
                    });
                }
            });
        });
    }

    researchInfo(research) {
        return (
            <Grid item xs={9}>
                <ButtonBase>
                    <Typography gutterBottom variant="h6">
                        <Link
                            style={{ color: "#01579b" }}
                            onClick={() =>
                                this.setState({
                                    ...this.state,
                                    openDialog: true,
                                    selectedResearch: research
                                })
                            }
                        >
                            {research.title}
                        </Link>
                    </Typography>
                </ButtonBase>
                <Typography variant="subtitle1" gutterBottom>
                    Introduction:{" "}
                    {research.description === undefined
                        ? ""
                        : research.description.length <= 100
                        ? research.description
                        : research.description.substring(0, 100).concat("...")}
                </Typography>

                <Typography variant="body2" color="textSecondary">
                    Deadline: {research.deadline}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Duration: {research.duration}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Positions: {research.positions}
                </Typography>

                {this.props.userType === "Student" && (
                    <Grid style={{ marginTop: 5 }} item>
                        <Button
                            onClick={(e) => {
                                this.setState({
                                    ...this.state,
                                    toApplication: true,
                                    chosenTitle: research.title,
                                    chosenId: research.id
                                });
                            }}
                            className="search__button"
                        >
                            Apply
                        </Button>
                    </Grid>
                )}
                {this.props.userType === "Administrator" && (
                    <Grid item>
                        <Grid container direction="column" justify="center">
                            <div style={{ height: 10 }}></div>
                            <Button className="search__button">Remove</Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        );
    }

    listGenerator(list) {
        return list.map((research) => {
            return (
                <Paper
                    style={{ height: 300, width: 1000 }}
                    variant="outlined"
                    square
                >
                    <Grid
                        container
                        spacing={2}
                        justify="center"
                        style={{ marginTop: 25, marginLeft: 25 }}
                        direction="row"
                        alignItems="center"
                    >
                        {this.researchInfo(research)}
                        <Grid item xs={2}>
                            <Avatar className="researcher-icon">
                                {research.researcher[0]}
                            </Avatar>
                            <Typography variant="subtitle1" color="primary">
                                Researcher:
                            </Typography>
                            <ButtonBase>
                                <Typography gutterBottom variant="subtitle1">
                                    <Link
                                        style={{ color: "primary" }}
                                        onClick={() =>
                                            this.setState({
                                                toProfile: {
                                                    value: true,
                                                    data: {
                                                        otherUser: true,
                                                        email: research.email
                                                    }
                                                }
                                            })
                                        }
                                    >
                                        {research.researcher}
                                    </Link>
                                </Typography>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Paper>
            );
        });
    }

    applyFilters(list) {
        const filters = this.state.filters;
        let filteredList = list.filter((research) => {
            let matchTitle,
                matchResearcher,
                matchKeywords,
                matchCategory,
                matchDuration,
                matchDeadline,
                matchCat;
            if (filters.keywords.localeCompare("") === 0) {
                matchKeywords = true;
            } else {
                matchTitle =
                    research.title
                        .toLowerCase()
                        .indexOf(filters.keywords.toLowerCase()) !== -1;
                matchResearcher =
                    research.researcher
                        .toLowerCase()
                        .indexOf(filters.keywords.toLowerCase()) !== -1;
                matchCat =
                    research.category
                        .toLowerCase()
                        .indexOf(filters.keywords.toLowerCase()) !== -1;
                matchKeywords = matchTitle || matchResearcher || matchCat;
            }
            matchCategory =
                filters.category.length === 0
                    ? true
                    : filters.category.includes(research.category);

            matchDuration =
                filters.duration.length === 0
                    ? true
                    : filters.duration.includes(research.duration);
            let matchAfter, matchBefore;
            let ddl = date.parse(research.deadline, "YYYY/MM/DD");
            if (filters.deadline.after === undefined) {
                let temp = new Date();
                matchAfter = Math.ceil(date.subtract(ddl, temp).toDays()) >= 0;
            } else if (filters.deadline.after === null) {
                matchAfter = true;
            } else {
                matchAfter =
                    Math.ceil(
                        date.subtract(ddl, filters.deadline.after).toDays()
                    ) >= 0;
            }
            if (filters.deadline.before === undefined) {
                let temp = new Date();
                matchBefore = date.subtract(temp, ddl).toDays() >= 0;
            } else if (filters.deadline.before === null) {
                matchBefore = true;
            } else {
                matchBefore =
                    date.subtract(filters.deadline.before, ddl).toDays() >= 0;
            }
            matchDeadline = matchAfter && matchBefore;
            matchKeywords = this.state.switches[0] ? matchKeywords : true;
            matchCategory = this.state.switches[3] ? matchCategory : true;
            matchDuration = this.state.switches[4] ? matchDuration : true;
            matchDeadline = this.state.switches[2] ? matchDeadline : true;
            return (
                matchKeywords && matchCategory && matchDuration && matchDeadline
            );
        });
        return filteredList;
    }

    getTermOptions() {
        if (this.state.list === undefined) {
            return [];
        }
        const terms = this.state.list
            .map((research) => research.duration)
            .reduce((unique, item) => {
                return unique.includes(item) ? unique : [...unique, item];
            }, []);
        return terms;
    }

    getCategoryOptions() {
        if (this.state.list === undefined) {
            return [];
        }
        let categories = this.state.list
            .map((research) => research.category)
            .reduce((unique, item) => {
                return unique.includes(item) ? unique : [...unique, item];
            }, []);
        categories.sort(
            (a, b) => -b.toUpperCase().localeCompare(a.toUpperCase())
        );
        return categories;
    }

    sortList(list) {
        if (this.state.listOrder === 0) {
            list.sort((a, b) => {
                // deadline latest first
                const a_ddl = date.parse(a.deadline, "YYYY/MM/DD");
                const b_ddl = date.parse(b.deadline, "YYYY/MM/DD");
                return -date.subtract(a_ddl, b_ddl).toDays();
            });
        } else if (this.state.listOrder === 1) {
            list.sort((a, b) => {
                // deadline earliest first
                const a_ddl = date.parse(a.deadline, "YYYY/MM/DD");
                const b_ddl = date.parse(b.deadline, "YYYY/MM/DD");
                return date.subtract(a_ddl, b_ddl).toDays();
            });
        } else {
            // sort in alphabet order
            list.sort(
                (a, b) =>
                    -b.title.toUpperCase().localeCompare(a.title.toUpperCase())
            );
        }
        return list;
    }

    displayList() {
        if (this.state.list === undefined) {
            //display loading image
        } else if (this.state.isFiltered) {
            if (
                this.state.listOrder === undefined ||
                this.state.listOrder === -1
            ) {
                return this.listGenerator(this.state.filtered);
            } else {
                return this.listGenerator(this.sortList(this.state.filtered));
            }
        } else {
            if (
                this.state.listOrder === undefined ||
                this.state.listOrder === -1
            ) {
                return this.listGenerator(this.state.list);
            } else {
                return this.listGenerator(this.sortList(this.state.list));
            }
        }
    }

    render() {
        if (this.state.toApplication) {
            return (
                <Redirect
                    to={{
                        pathname: "/application",
                        state: {
                            id: this.state.chosenId,
                            title: this.state.chosenTitle
                        }
                    }}
                />
            );
        }
        if (this.state.toProfile !== undefined && this.state.toProfile.value) {
            return (
                <Redirect
                    to={{
                        pathname: "/view-profile",
                        state: this.state.toProfile.data
                    }}
                />
            );
        }
        return (
            <div>
                <Grid style={{ marginTop: 40 }} container justify="center">
                    <Paper
                        style={{ height: 50, width: 1000 }}
                        variant="outlined"
                        square
                    >
                        <Grid container direction="row" xs={12}>
                            <Grid item xs={1} style={{ margin: 15 }}>
                                <Typography>{"Filters: "}</Typography>
                            </Grid>
                            <Grid item style={{ margin: 10 }} xs={9}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.switches[0]}
                                                onChange={(e) => {
                                                    const newSwitches = this
                                                        .state.switches;
                                                    newSwitches[0] =
                                                        e.target.checked;
                                                    this.setState({
                                                        switches: newSwitches
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label="Keywords"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.switches[1]}
                                                onChange={(e) => {
                                                    const newSwitches = this
                                                        .state.switches;
                                                    newSwitches[1] =
                                                        e.target.checked;
                                                    this.setState({
                                                        switches: newSwitches
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label="Type"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.switches[2]}
                                                onChange={(e) => {
                                                    const newSwitches = this
                                                        .state.switches;
                                                    newSwitches[2] =
                                                        e.target.checked;
                                                    this.setState({
                                                        switches: newSwitches
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label="Deadline"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.switches[3]}
                                                onChange={(e) => {
                                                    const newSwitches = this
                                                        .state.switches;
                                                    newSwitches[3] =
                                                        e.target.checked;
                                                    this.setState({
                                                        switches: newSwitches
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label="Category"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.switches[4]}
                                                onChange={(e) => {
                                                    const newSwitches = this
                                                        .state.switches;
                                                    newSwitches[4] =
                                                        e.target.checked;
                                                    this.setState({
                                                        switches: newSwitches
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label="Duration"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper
                        style={{ height: 300, width: 1000 }}
                        variant="outlined"
                        square
                    >
                        <Grid
                            style={{ marginTop: 15 }}
                            container
                            justify="center"
                            spacing={3}
                            direction="row"
                        >
                            <Grid item xs={8}>
                                <TextField
                                    label="Enter keywords: research area, researcher..."
                                    onChange={(e) =>
                                        this.setState({
                                            filters: {
                                                ...this.state.filters,
                                                keywords: e.target.value
                                            }
                                        })
                                    }
                                    style={{
                                        display: this.state.switches[0]
                                            ? ""
                                            : "none"
                                    }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            style={{ marginTop: 20 }}
                            container
                            justify="center"
                            spacing={3}
                            direction="row"
                        >
                            <Grid item xs={4}>
                                <Autocomplete
                                    style={{
                                        display: this.state.switches[1]
                                            ? ""
                                            : "none"
                                    }}
                                    options={["Research"]}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Type of Opportunities"
                                            variant="outlined"
                                        />
                                    )}
                                    onChange={(e, value) =>
                                        this.setState({
                                            filters: {
                                                ...this.state.filters,
                                                type: value
                                            }
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        style={{
                                            display: this.state.switches[2]
                                                ? ""
                                                : "none"
                                        }}
                                        format="yyyy/MM/dd"
                                        label="Deadline after"
                                        disablePast={true}
                                        placeholder=""
                                        value={
                                            this.state.filters.deadline.after
                                        }
                                        onChange={(date) => {
                                            this.setState({
                                                filters: {
                                                    ...this.state.filters,
                                                    deadline: {
                                                        ...this.state.filters
                                                            .deadeline,
                                                        after: date
                                                    }
                                                }
                                            })
                                            console.log(date)
                                        }
                                        }
                                        KeyboardButtonProps={{
                                            "aria-label": "change date"
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        style={{
                                            display: this.state.switches[2]
                                                ? ""
                                                : "none"
                                        }}
                                        format="yyyy/MM/dd"
                                        label="Deadline before"
                                        disablePast={true}
                                        value={
                                            this.state.filters.deadline.before
                                        }
                                        onChange={(date) =>
                                            this.setState({
                                                filters: {
                                                    ...this.state.filters,
                                                    deadline: {
                                                        ...this.state.filters
                                                            .deadline,
                                                        before: date
                                                    }
                                                }
                                            })
                                        }
                                        KeyboardButtonProps={{
                                            "aria-label": "change date"
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>

                        <Grid
                            style={{ marginTop: 20 }}
                            container
                            justify="center"
                            spacing={3}
                            direction="row"
                        >
                            <Grid item xs={4}>
                                <Autocomplete
                                    style={{
                                        display: this.state.switches[3]
                                            ? ""
                                            : "none"
                                    }}
                                    multiple
                                    classes={{
                                        groupLabel: "group-label",
                                        groupUl: "group-item"
                                    }}
                                    options={this.getCategoryOptions()}
                                    disableCloseOnSelect
                                    groupBy={(option) =>
                                        option[0].toUpperCase()
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Category"
                                            variant="outlined"
                                        />
                                    )}
                                    renderOption={(option, { selected }) => (
                                        <React.Fragment>
                                            <Checkbox
                                                icon={
                                                    <CheckBoxOutlineBlankIcon fontSize="small" />
                                                }
                                                checkedIcon={
                                                    <CheckBoxIcon fontSize="small" />
                                                }
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option}
                                        </React.Fragment>
                                    )}
                                    onChange={(e, value) =>
                                        this.setState({
                                            filters: {
                                                ...this.state.filters,
                                                category: value
                                            }
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    style={{
                                        display: this.state.switches[4]
                                            ? ""
                                            : "none"
                                    }}
                                    multiple
                                    options={this.getTermOptions()}
                                    disableCloseOnSelect
                                    renderOption={(option, { selected }) => (
                                        <React.Fragment>
                                            <Checkbox
                                                icon={
                                                    <CheckBoxOutlineBlankIcon fontSize="small" />
                                                }
                                                checkedIcon={
                                                    <CheckBoxIcon fontSize="small" />
                                                }
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option}
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Duration"
                                        />
                                    )}
                                    onChange={(e, value) =>
                                        this.setState({
                                            filters: {
                                                ...this.state.filters,
                                                duration: value
                                            }
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper
                        style={{ height: 60, width: 1000 }}
                        variant="outlined"
                        square
                    >
                        <Grid
                            container
                            direction="row"
                            style={{ marginTop: 10 }}
                            justify="center"
                        >
                            <Grid item xs={1} style={{ marginRight: 30 }}>
                                <Button
                                    onClick={() => {
                                        this.setState({ isFiltered: true });
                                        const results = this.applyFilters(
                                            this.state.list
                                        );
                                        this.setState({ filtered: results });
                                    }}
                                    className="search__button"
                                >
                                    Search
                                </Button>
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    onClick={() => {
                                        this.setState({ isFiltered: false });
                                    }}
                                    className="search__button"
                                >
                                    show all
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <div style={{ height: 40 }} />
                <Divider />

                <Grid style={{ marginTop: 40 }} container justify="center">
                    <Paper
                        style={{ height: 50, width: 1000 }}
                        variant="outlined"
                        square
                    >
                        <Grid container justify="space-between">
                            <Grid item xs={4} style={{ margin: 15 }}>
                                <Typography
                                    style={{ color: "#01579b", flex: 1 }}
                                >
                                    Showing{" "}
                                    {this.state.list === undefined
                                        ? 0
                                        : this.state.isFiltered
                                        ? this.state.filtered.length
                                        : this.state.list.length}{" "}
                                    opportunities
                                </Typography>
                            </Grid>

                            <Grid item xs={3} style={{ marginBottom: 20 }}>
                                <Autocomplete
                                    options={[
                                        {
                                            value: "Deadline: latest first",
                                            index: 0
                                        },
                                        {
                                            value: "Deadline: earliest first",
                                            index: 1
                                        },
                                        {
                                            value: "Title: alphabet order",
                                            index: 2
                                        }
                                    ]}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Sorted by"
                                        />
                                    )}
                                    onChange={(e, value) => {
                                        if (value !== null) {
                                            this.setState({
                                                listOrder: value.index
                                            });
                                        } else {
                                            this.setState({ listOrder: -1 });
                                        }
                                    }}
                                    getOptionLabel={(option) => option.value}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    {this.displayList()}
                </Grid>
                <Dialog
                    id="application-detail-dialog"
                    open={this.state.openDialog}
                    onClose={() => this.setState({ openDialog: false })}
                >
                    <DialogTitle>
                        {this.state.selectedResearch.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Introduction:
                            <DialogContentText>
                                {this.state.selectedResearch.description}
                            </DialogContentText>
                        </DialogContentText>
                        <DialogContentText>
                            Researcher: {this.state.selectedResearch.researcher}
                        </DialogContentText>
                        <DialogContentText>
                            Deadline: {this.state.selectedResearch.deadline}
                        </DialogContentText>
                        <DialogContentText>
                            Duration: {this.state.selectedResearch.duration}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={() => this.setState({ openDialog: false })}
                            color="primary"
                        >
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Search;
