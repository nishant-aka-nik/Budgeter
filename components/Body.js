import { Card, Grid, Table, Text } from "@nextui-org/react";
import Recurring from "./Recurring";



export default function Body() {
    return (<div>
        {/* <Cards /> */}
        <Recurring/>
    </div>)
}


function Cards() {
    const list = [
        {
            title: "DASHBOARD",
            table: {
                columns: [
                    {
                        key: "name",
                        label: "NAME",
                    },
                    {
                        key: "value",
                        label: "VALUE",
                    },
                ],
                rows: [
                    {
                        key: "1",
                        name: "Tony Reichert",
                        value: "CEO",
                    },
                ]
            }
        },
        {
            title: "RECURRING EXPENSES",
            table: {
                columns: [
                    {
                        key: "name",
                        label: "NAME",
                    },
                    {
                        key: "value",
                        label: "VALUE",
                    },
                    {
                        key: "delete",
                        label: "",
                    },
                ],
                rows: [
                    {
                        key: "1",
                        name: "Tony Reichertgagaggaga",
                        value: "CEO",
                        delete: "",
                    },
                ]
            }
        },
        {
            title: "Extra Expen",
            table: {
                columns: [
                    {
                        key: "name",
                        label: "NAME",
                    },
                    {
                        key: "value",
                        label: "VALUE",
                    },
                ],
                rows: [
                    {
                        key: "1",
                        name: "Tony Reichertgagaggaga",
                        value: "CEO",
                    },
                ]
            }
        },
    ];

    return (
        <Grid.Container gap={2} justify="center">
            {list.map((item, index) => (
                <Grid xs={10} sm={3} key={index}>
                    <Card isPressable>
                        <Card.Header>
                            <Text b>{item.title}</Text>
                        </Card.Header>
                        <Card.Body css={{ p: 0 }}>
                            <DashboardTable
                                columns={item.table.columns}
                                rows={item.table.rows} />
                        </Card.Body>
                    </Card>
                </Grid>
            ))}
        </Grid.Container>
    );
}

function DashboardTable({ columns, rows }) {
    // const columns = [
    //     {
    //         key: "name",
    //         label: "NAME",
    //     },
    //     {
    //         key: "role",
    //         label: "ROLE",
    //     },
    //     {
    //         key: "status",
    //         label: "STATUS",
    //     },
    // ];
    // const rows = [
    //     {
    //         key: "1",
    //         name: "Tony Reichert",
    //         role: "CEO",
    //         status: "Active",
    //     },
    //     {
    //         key: "2",
    //         name: "Zoey Lang",
    //         role: "Technical Lead",
    //         status: "Paused",
    //     },
    //     {
    //         key: "3",
    //         name: "Jane Fisher",
    //         role: "Senior Developer",
    //         status: "Active",
    //     },
    //     {
    //         key: "4",
    //         name: "William Howard",
    //         role: "Community Manager",
    //         status: "Vacation",
    //     },
    // ];
    return (
        <Table
            compact
            aria-label="Example table with dynamic content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
            </Table.Header>
            <Table.Body items={rows}>
                {(item) => (
                    <Table.Row key={item.key}>
                        {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}
