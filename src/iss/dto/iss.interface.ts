type IssPosition = {
    latitude: 28.5258,
    longitude: -67.7860;
};

export interface IssCoordinates {
    message: string,
    timestamp: number,
    iss_position: IssPosition;
}