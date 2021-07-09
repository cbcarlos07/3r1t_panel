export interface PedidoDTO {
    ped_id: number
    ped_cli: number
    ped_status: number
    ped_dt_pedido: string
    cli_nome: string
    total?: number,
    cli_rua: string
    cli_numero: string
    cli_bairro: string
    ped_id_on: number
    status: string
}