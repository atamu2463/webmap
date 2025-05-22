import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

//地図画面を作成
const map = new Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            osm: { // OpenStreetMapのタイルデータを定義
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            },
        },
        layers: [
            {// OpenStreetMapのタイルデータを表示
                id: 'osm',
                type: 'raster',
                source: 'osm',
            },
        ],
    },
    center: [143.95, 43.65],
    zoom: 6,
});

//コンパイルを通すため、mapを使用扱いにする
(window as any).map = map;