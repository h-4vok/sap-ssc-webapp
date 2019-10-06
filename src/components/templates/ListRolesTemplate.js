import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const styles = theme => ({
  centerText: {
    textAlign: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    display: 'flex'
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    minWidth: 100
  },
  buttonBar: {
    display: 'flex',
    alignItems: 'center'
  }
});

class ListRolesTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      oneRowSelected: false,
      multipleRowsSelected: false
    };
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();

    this.setState({
      oneRowSelected: selected.length === 1,
      multipleRowsSelected: selected.length > 0
    });
  };

  isEnabledFormatter = params =>
    params.value ? 'Habilitado' : 'No Habilitado';

  buildGridDef = () => [
    {
      headerName: 'ID',
      field: 'Id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      headerName: 'Nombre',
      field: 'Name',
      sortable: true,
      filter: true
    },
    {
      headerName: '# de Usuarios',
      field: 'QuantityOfUsers',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: '# de Permisos',
      field: 'QuantityOfPermissions',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: 'Habilitado',
      field: 'IsEnabled',
      sortable: true,
      filter: true,
      valueFormatter: this.isEnabledFormatter
    }
  ];

  render() {
    const { items, classes, onRefresh, onNewAction } = this.props;
    const { oneRowSelected, multipleRowsSelected } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.buttonBar}>
            <Box p={1}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onRefresh}
              >
                Ejecutar
              </Button>
            </Box>

            <Button
              variant="contained"
              onClick={onNewAction}
              className={classes.button}
            >
              Nuevo
            </Button>
            <Button
              variant="contained"
              onClick={onRefresh}
              className={classes.button}
              disabled={!oneRowSelected}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              onClick={onRefresh}
              className={classes.button}
              disabled={!multipleRowsSelected}
            >
              Habilitar
            </Button>
            <Button
              variant="contained"
              onClick={onRefresh}
              className={classes.button}
              disabled={!multipleRowsSelected}
            >
              Inhabilitar
            </Button>
            <Button
              variant="contained"
              onClick={onRefresh}
              className={classes.button}
              disabled={!multipleRowsSelected}
            >
              Eliminar
            </Button>
            <Button
              variant="contained"
              onClick={onRefresh}
              className={classes.button}
            >
              Exportar
            </Button>
          </div>

          <div
            className="ag-theme-material"
            style={{ height: 500, width: 1024 }}
          >
            <AgGridReact
              ref={c => (this.dataGrid = c)}
              rowSelection="multiple"
              columnDefs={this.buildGridDef()}
              rowData={items}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export const ListRolesTemplate = withStyles(styles)(ListRolesTemplateComponent);
