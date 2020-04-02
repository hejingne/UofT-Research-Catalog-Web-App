import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Typography, ButtonBase, TextField, Button, Divider} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import { Pagination, Autocomplete } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import date from 'date-and-time';

import './styles.css'
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
                keywords: '',
                type: '',
                category: [],
                deadline: {},
                duration: []
            },
            /** Hardcoding some researches */
            researchList: [{
                title: 'Computational Genomics',
                description: 'This is some details of this research. Thus is some more details of this research.',
                researcher: 'James Charles',
                duration: '2020 Fall - 2021 Winter',
                deadline: date.parse('2020/06/30', 'YYYY/MM/DD'),
                category: 'Medical Biophysics'
                
            }, {
                title: 'Conservation, Ecology, and Evolution',
                description: 'This is some details of this research. Thus is some more details of this research.',
                researcher: 'Sally Tomkins',
                duration: '2020 summer',
                deadline: date.parse('2020/03/01', 'YYYY/MM/DD'),
                category: 'Biology'
            }, {
                title: 'Quantitative Transportation Geography and Spatial Analysis',
                description: 'This is some details of this research. Thus is some more details of this research.',
                researcher: 'Steven Farber',
                duration: '2020 Fall - 2021 Winter',
                deadline: date.parse('2020/07/30', 'YYYY/MM/DD'),
                category: 'Geography'
            }, {
                title: "Computational Analytics", 
                description: 'This is some details of this research. Thus is some more details of this research.',
                researcher: 'Mike Oreo',
                duration: '2020 Fall - 2021 Winter',
                deadline: date.parse('2020/05/28', 'YYYY/MM/DD'),
                category: 'Data Science'
            }, {
                title: "Geophysical Research Studies", 
                description: 'This is some details of this research. Thus is some more details of this research.',
                researcher: 'Mike Oreo',
                duration: '2020 Fall - 2021 Winter',
                deadline: date.parse('2020/06/01', 'YYYY/MM/DD'),
                category: 'Geophysics'
            }],
        };
        this.listGenerator.bind(this);
        this.applyFilters.bind(this);
        this.getCategoryOptions.bind(this);
        this.getTermOptions.bind(this);
        this.researchInfo.bind(this);
    }

    researchInfo(research) {
        return (
            <Grid item xs>
                <ButtonBase>
                    <Typography gutterBottom variant="h6">
                        <Link style={{color: '#01579b'}} 
                              onClick={() => this.setState({openDialog: true})}>
                            {research.title}
                        </Link>
                    </Typography>
                </ButtonBase>
                <Typography variant="subtitle1" gutterBottom>
                    Introduction
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Researcher: {research.researcher}
                    </Typography>
                <Typography variant="body2" color="textSecondary">
                    Deadline: {date.format(research.deadline, 'YYYY/MM/DD')}
                    Duration: {research.term}
                </Typography>       
            </Grid>
        )
    }

    listGenerator(list) {
        return (
            list.map((research) => {
                return <Paper style={{height: 200, width: 1000}} variant="outlined" square>
                <Grid container spacing={2} justify="center" style={{ marginTop: 25, marginLeft: 25 }}
                alignItems="center">
                    {this.researchInfo(research)}

                    {this.userType === "Student" &&
                        <Grid item>
                            <Button onClick={()=>this.setState({toApplication: true})} className="search__button">Apply</Button>
                        </Grid>
                    }
                    {this.userType === "Administrator" &&
                        <Grid item>
                            <Grid container direction="column" justify="center">
                            <Button onClick={()=>this.setState({toApplication: true})} className="search__button">Apply</Button>
                            <div style={{height: 10}}></div>
                            <Button onClick={()=>{for (let i = 0; i < this.state.researchList.length; i++) {
                                if (research.title === this.state.researchList[i].title) {
                                    this.state.researchList.splice(i, 1);
                                    this.setState({researchList: this.state.researchList});
                                    return ;
                                }
                            }}} className="search__button">Remove</Button>
                            </Grid>
                        </Grid>
                    } 
                </Grid>
                </Paper>
            })
        );
    }

    

    applyFilters(list) {
        const filters = this.state.filters;
        let filteredList = list.filter(
            (research) => {
                let matchTitle, matchResearcher, matchKeywords, 
                matchCategory, matchDuration, matchDeadline, matchType;
                if (filters.keywords === '') {
                    matchKeywords = true;
                } else {
                    matchTitle = research.title.toLowerCase().indexOf(filters.keywords.toLowerCase()) !== -1;
                    matchResearcher = research.researcher.toLowerCase().indexOf(filters.keywords.toLowerCase()) !== -1;
                    matchKeywords = matchTitle || matchResearcher;
                }
                matchCategory = filters.category.length === 0 ? true : (filters.category.includes(research.category));
                console.log(research.category)
                console.log(filters.category)
                matchDuration = filters.duration.length === 0 ? true : (filters.duration.includes(research.duration));
                let matchAfter, matchBefore;
                if (filters.deadline.after === undefined) {
                    let temp = new Date();
                    matchAfter = Math.ceil(date.subtract(research.deadline, temp).toDays()) >= 0;
                } else if (filters.deadline.after === null) {
                    matchAfter = true;
                } else {
                    matchAfter = Math.ceil(date.subtract(research.deadline, filters.deadline.after).toDays()) >= 0;
                }
                if (filters.deadline.before === undefined) {
                    let temp = new Date();
                    matchBefore = date.subtract(temp, research.deadline).toDays() >= 0;
                } else if (filters.deadline.before === null) {
                    matchBefore = true;
                } else {
                    matchBefore = date.subtract(filters.deadline.before, research.deadline).toDays() >= 0;
                }
                matchDeadline = matchAfter && matchBefore;
                return matchKeywords && matchCategory && matchDuration && matchDeadline;
            }
        )
        return filteredList;
    }

    getTermOptions() {
        const terms = this.state.researchList.map(
            (research) => research.duration
        ).reduce((unique, item) => {
            return unique.includes(item) ? 
                unique : [...unique, item];
        }, []);
        return terms;
    }

    getCategoryOptions() {
        let categories = this.state.researchList.map(
            (research) => research.category
        ).reduce((unique, item) => {
            return unique.includes(item) ? 
                unique : [...unique, item];
        }, []);
        categories.sort((a, b) => -b[0].toUpperCase().localeCompare(a[0].toUpperCase()));
        return categories;
    }

    

    render() {
        if (this.state.toApplication === true) {
            return <Redirect to="/application"/>;
        }
        return (
            <div>
                <Grid style={{marginTop: 15}} container justify="center" spacing={3} direction="row">
                <Grid item xs={6}>
                    <TextField label="Enter keywords: research area, researcher..."
                               onChange={(e) => this.setState({
                                    filters: {
                                        ...this.state.filters, 
                                        keywords: e.target.value
                                    }
                                })}
                               fullWidth/>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => {
                        this.setState({isFiltered : true}); 
                        const results = this.applyFilters(this.state.researchList);
                        this.setState({filtered: results}) 
                    }}
                            className="search__button">Search</Button>
                </Grid>
                </Grid>

                <Grid style={{marginTop: 20}} container justify="center" spacing={3} direction="row">
                    <Grid item xs={4}>
                    <Autocomplete
                        options={['Research', 'Job']}
                        renderInput={params => <TextField {...params} label="Type of Opportunities" variant="outlined" />}
                        onChange={(e, value) => this.setState({
                                filters: {
                                    ...this.state.filters, type: value
                                }
                        })}/>
                    </Grid>
                    
                    <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker 
                        format="yyyy/MM/dd"
                        label="Deadline after (including)"
                        disablePast={true}
                        placeholder=""
                        value={this.state.filters.deadline.after}
                        onChange={(date) => this.setState({
                            filters: {
                                ...this.state.filters, deadline: {
                                    ...this.state.filters.deadeline,
                                    after: date
                                }
                            }
                        })}
                        KeyboardButtonProps={{
                        'aria-label': 'change date',
                        }}/>
                    </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker 
                        format="yyyy/MM/dd"
                        label="Deadline before (including)"
                        disablePast={true}
                        value={this.state.filters.deadline.before}
                        onChange={(date) => this.setState({
                            filters: {
                                ...this.state.filters, deadline: {
                                    ...this.state.filters.deadline,
                                    before: date
                                }
                            }
                        })}
                        KeyboardButtonProps={{
                        'aria-label': 'change date',
                        }}/>
                    </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>

                <Grid style={{marginTop: 20}} container justify="center" spacing={3} direction="row" >
                <Grid item xs={4}>
                    <Autocomplete
                        multiple
                        classes={{groupLabel : "group-label", groupUl : 'group-item'}}
                        options={this.getCategoryOptions()}
                        disableCloseOnSelect
                        groupBy={option => option[0].toUpperCase()}
                        renderInput={params => <TextField {...params} label="Category" variant="outlined" />}
                        renderOption={(option, { selected }) => (
                            <React.Fragment>
                                <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}/>
                            {option}
                            </React.Fragment>
                        )}
                        onChange={(e, value) => this.setState({
                            filters: {
                                ...this.state.filters, category: value
                            }
                        })}/>
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        multiple
                        options={this.getTermOptions()}
                        disableCloseOnSelect
                        renderOption={(option, { selected }) => (
                            <React.Fragment>
                                <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}/>
                            {option}
                            </React.Fragment>
                        )}
                        renderInput={params => (
                            <TextField {...params} variant="outlined" label="Duration" />
                        )}
                        onChange={(e, value) => this.setState({
                            filters: {
                                ...this.state.filters, duration: value
                            }
                        })}/>    
                </Grid>
                </Grid>
                <div style={{height: 40}}/>
                <Divider />

                <Grid style={{marginTop: 40}} container justify="center">
                    <Paper style={{height: 50, width: 1000}} variant="outlined" square>
                        <Grid container justify="space-between">
                        <Grid item xs={4} style={{margin: 15}}>
                            <Typography style={{color: '#01579b', flex: 1}}>Showing {this.state.researchList.length} opportunities</Typography>
                        </Grid>

                        <Grid item xs={2} style={{marginBottom: 20}}>
                            <Autocomplete
                            options={[
                                {value: 'Deadline: latest first', index: 0}, 
                                {value: 'Deadline: earliest first', index: 1},
                                {value: 'Title: alphabet order', index: 2}
                            ]}
                            renderInput={params => <TextField {...params} label="Sorted by" />}
                            getOptionLabel={(option) => option.value}/>
                        </Grid>
                        </Grid>
                    </Paper>

                    {this.state.isFiltered ? 
                        this.listGenerator(this.state.researchList) : 
                        this.listGenerator(this.state.filtered)}
                </Grid>
                
                
            </div>
        );
    }
}

export default Search;
