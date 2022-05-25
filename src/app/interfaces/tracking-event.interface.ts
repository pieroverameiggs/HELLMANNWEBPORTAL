
export interface TrackingEvent {
    INT_SHIPMENTDOCUMENTID: number;
    INT_IDEVENTTRACKING: number;
    DAT_ESTIMATEDATE: Date;
    DAT_ACTUALDATE: Date;
    INT_IDTRACKINGDATE: number;
    INT_IDGROUPDATE: number;
    VCH_GROUPNAME: string;
    VCH_ENGLISHDESCRIPTION: string;
    VCH_SPANISHDESCRIPTION: string;
    VCH_NAMEDATE: string;
    VCH_ROWCOLOR: string;
}