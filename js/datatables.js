/** @jsx React.DOM */


var DataTableHead = React.createClass({

    render: function() {
        var columns = this.props.columns.map(function(column){
            return <th>{column}</th>
        });
        return (
            <thead>
                <tr>
                {columns}
                </tr>
            </thead>
        );
    }
})

var DataTableBody = React.createClass({
    render: function() {
        var columns = this.props.columns
        console.log(columns + " " + this.props.data)
        var rows = this.props.data.map(function(row){
            console.log(row)
            var populatedRow = columns.map(function(col){
                return <td>{row[col]}</td>
            })

            return <tr> {populatedRow} </tr>
        });
        return (
            <tbody>
                {rows.length > 0 ? rows : ''}
            </tbody>
        );
    }
})

var DataTable = React.createClass({
  getInitialState: function() {
    return {
      columns: [],
      data: []
    };
  },

  componentDidMount: function() {

    $.get("/data/schema.json", function(result) {
        if (this.isMounted()) {
            this.setState({
              columns: result,
              data: this.state.data
            });
        }

        $(document).ready(function() {
            $('#example').dataTable();
        });
    }.bind(this));

    console.log("getting market data")

    $.ajax({
          url: '/data/ticks.json',
          dataType: 'json',
          cache: false,
          success: function(data) {
              this.setState({
                columns: this.state.columns,
                data: data
              });

              $(document).ready(function() {
                  $('#example').dataTable();
              });
          }.bind(this),
          error: function(xhr, status, err) {
            console.log(err);
          }.bind(this)
    });
  },

  render: function() {
    return (
      <table className="table table-striped" id="example">
          <DataTableHead columns={this.state.columns}/>
          <DataTableBody columns={this.state.columns} data={this.state.data}/>
      </table>
    );
  }
});

React.render(
  <DataTable />,
  document.getElementById("dt")
);