import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './CustomDataGrid.css';

  
const col: GridColDef[] = [
    //{ field: 'datid', headerName: 'datid'},
    { field: 'datname', headerName: 'database', flex: 3},
    { field: 'pid', headerName: 'pid', flex: 1},
    //{ field: 'leader_pid', headerName: 'leader_pid' },
    //{ field: 'usesysid', headerName: 'usesysid' },
    { field: 'usename', headerName: 'usename', flex: 2},
    //{ field: 'application_name', headerName: 'application_name', flex: 2},
    { field: 'client_addr', headerName: 'client_addr', flex: 1},
    //{ field: 'client_hostname', headerName: 'client_hostname', flex: 1},
    //{ field: 'client_port', headerName: 'port', flex: 1},
    //{ field: 'backend_start', headerName: 'backend_start' },
    //{ field: 'xact_start', headerName: 'xact_start' },
    { field: 'query_start', headerName: 'query_start', flex: 2, type: 'dateTime', valueGetter: ({ value }) => value && new Date(value)},
    //{ field: 'state_change', headerName: 'state_change', flex: 2},
    //{ field: 'wait_event_type', headerName: 'wait_event_type' },
    //{ field: 'wait_event', headerName: 'wait_event' },
    { field: 'state', headerName: 'state', flex: 1},
    //{ field: 'backend_xid', headerName: 'backend_xid' },
    //{ field: 'backend_xmin', headerName: 'backend_xmin },
    { field: 'query', headerName: 'query', getApplyQuickFilterFn: undefined, flex: 5},
    //{ field: 'backend_type', headerName: 'backend_type'},
  ];

export default function CustomDataGrid() {

    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [tips, setTips] = useState("");

    const getData = () => {   
        fetch(process.env.PUBLIC_URL + "/config.json")
        .then((res) => res.json())
        .then((data) => {
            setTitle(data.title)
            setTips(data.tooltips_msg)
            callWebAPI(data.webapi_url + "/connection");
        });  
      }


    const callWebAPI = (api) => {
        // Change this endpoint to whatever local or online address you have
        // Local PostgreSQL Database

        fetch(api)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setApiData(data);
                setError(null)
            }).catch((err) => {
                setError(err.message)
            }).finally(() => {
                setLoading(false);
            });
            
    };

    useEffect(() => {
        getData();
    }, []);

    const CustomToolbar = () => {
        return (
            <div className="toolbar">
                <GridToolbarContainer>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <p>{tips}</p>
                            </React.Fragment>
                        } arrow
                    >
                        <div><GridToolbarQuickFilter /></div>
                    </HtmlTooltip>
                </GridToolbarContainer>
          </div>
        );
    }

    const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 280,
          fontSize: theme.typography.pxToRem(14)
        },
      }));
    
    return (
        <div style={{ width: '100%' }}>
            <h1>{title}</h1>
            {loading && !error ? <></> : 
                error ? <>{error}</> :  <Box sx={{ height: window.innerHeight, width: '100%',   '& .active':{
                                                                                                            backgroundColor: '#66bb6a'
                                                                                                        },
                                                                                                '& .idle': {
                                                                                                            backgroundColor: '#bdbdbd'
                                                                                                        }   
                                                }}>
                                            <DataGrid   getRowHeight={() => 'auto'}
                                                        disableColumnMenu
                                                        disableColumnFilter
                                                        disableColumnSelector
                                                        disableDensitySelector
                                                        rows={apiData} 
                                                        columns={col}
                                                        getRowId={(row) => row.pid}
                                                        getCellClassName={(params: GridCellParams<any, any, number>) => {
                                                            if (params.field === 'state') 
                                                                return params.value == 'active' ? 'active' : (params.value == 'idle' ? 'idle': '');
                                                        }}
                                                        initialState={{
                                                            /*pagination: {
                                                            paginationModel: {
                                                                pageSize: 10,
                                                            },
                                                            },*/
                                                            sorting: {
                                                                sortModel: [{ field: 'state', sort: 'asc' }, 
                                                                            { field: 'datname', sort: 'asc' }, 
                                                                            { field: 'usename', sort: 'asc' }],
                                                            }
                                                        }}
                                                        //pageSizeOptions={[5]}
                                                        slots={{ toolbar: CustomToolbar }}
                                            />
                                        </Box>
            
            }
        </div>
    )
}
