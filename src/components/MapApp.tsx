import React, { useEffect, useRef, useState } from 'react';
import maplibregl, { Map, Marker, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

type Pin = {
  id: string;
  lngLat: [number, number];
  marker: Marker;
};

const MapApp: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
          },
        ],
      },
      center: [143.95, 43.65],
      zoom: 6,
    });

    mapRef.current = map;

    map.on('click', (e) => {
      const id = Date.now().toString();
      const lngLat: [number, number] = [e.lngLat.lng, e.lngLat.lat];

      const popup = new Popup({ offset: 25 }).setHTML(createPopupContent(id));

      const marker = new Marker({ color: '#d00' })
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(map);

      setPins((prev) => [...prev, { id, lngLat, marker }]);
    });

    return () => {
      map.remove();
    };
  }, []);

  // ポップアップのHTMLとイベント
  const createPopupContent = (id: string) => {
    return `
      <div>
        <button onclick="window.handleEdit('${id}')">編集</button>
        <button onclick="window.handleDelete('${id}')">削除</button>
      </div>
    `;
  };

  // グローバル関数でマーカー操作
  useEffect(() => {
    (window as any).handleEdit = (id: string) => {
      const label = prompt('新しいラベルを入力してください');
      if (label !== null) {
        const pin = pins.find((p) => p.id === id);
        if (pin) {
          pin.marker.setPopup(new Popup({ offset: 25 }).setHTML(`<div>${label}<br>${createPopupContent(id)}</div>`));
        }
      }
    };

    (window as any).handleDelete = (id: string) => {
      setPins((prev) => {
        const target = prev.find((p) => p.id === id);
        if (target) target.marker.remove();
        return prev.filter((p) => p.id !== id);
      });
    };
  }, [pins]);

  return <div ref={mapContainerRef} id="map" style={{ height: '100vh' }} />;
};

export default MapApp;
