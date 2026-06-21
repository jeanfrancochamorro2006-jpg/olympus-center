export type Store = {
  ciudad: string;
  dir: string;
  hora: string;
  tel: string;
  query: string;
};

export const stores: Store[] = [
  {
    ciudad: "Lima Centro",
    dir: "Av. Tecnológica 123, Cercado de Lima",
    hora: "Lun a Sáb · 10:00 - 20:00",
    tel: "+51 999 888 777",
    query: "Plaza Mayor de Lima, Cercado de Lima, Perú",
  },
  {
    ciudad: "Miraflores",
    dir: "Av. Larco 456, Miraflores",
    hora: "Lun a Sáb · 10:00 - 21:00",
    tel: "+51 999 888 778",
    query: "Parque Kennedy, Miraflores, Lima, Perú",
  },
  {
    ciudad: "San Juan de Lurigancho",
    dir: "Av. Próceres 789, SJL",
    hora: "Lun a Dom · 10:00 - 20:00",
    tel: "+51 999 888 779",
    query: "San Juan de Lurigancho, Lima, Perú",
  },
];
