let Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "kategori_konten", deps: []
 * createTable() => "kategori_lomba", deps: []
 * createTable() => "user", deps: []
 * createTable() => "artikel", deps: [kategori_konten]
 * createTable() => "berita", deps: [kategori_konten]
 * createTable() => "jenis_lomba", deps: [kategori_lomba]
 * createTable() => "bidang_lomba", deps: [jenis_lomba]
 * createTable() => "tag_lomba", deps: [kategori_lomba]
 * createTable() => "tag", deps: [tag_lomba, jenis_lomba]
 * createTable() => "mahasiswa", deps: [berita]
 *
 */

let info = {
  revision: 1,
  name: "Puspresnas",
  created: "2021-08-13T02:06:35.415Z",
  comment: "",
};

let migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "kategori_konten",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        kategori: { type: Sequelize.STRING, field: "kategori" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "kategori_lomba",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        kategori: { type: Sequelize.STRING, field: "kategori" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        nama: { type: Sequelize.STRING, field: "nama" },
        username: { type: Sequelize.STRING, field: "username" },
        password: { type: Sequelize.STRING, field: "password" },
        level: { type: Sequelize.ENUM("Superadmin", "Admin"), field: "level" },
        foto: { type: Sequelize.STRING, field: "foto" },
        is_active: {type: Sequelize.TINYINT, field: "is_active"}
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "artikel",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        judul: { type: Sequelize.STRING, field: "judul" },
        deskripsi: { type: Sequelize.STRING, field: "deskripsi" },
        isi: { type: Sequelize.STRING, field: "isi" },
        tanggal: { type: Sequelize.STRING, field: "tanggal" },
        foto: { type: Sequelize.STRING, field: "foto", allowNull: false },
        kategori_konten_id: {
          type: Sequelize.INTEGER,
          field: "kategori_konten_id",
        },
        kategoriKontenId: {
          type: Sequelize.INTEGER,
          field: "kategori_konten_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "kategori_konten", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "berita",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        judul: { type: Sequelize.STRING, field: "judul" },
        deskripsi: { type: Sequelize.STRING, field: "deskripsi" },
        isi: { type: Sequelize.STRING(2000), field: "isi" },
        tanggal: { type: Sequelize.STRING, field: "tanggal" },
        foto: { type: Sequelize.STRING, field: "foto", allowNull: false },
        kategori_konten_id: {
          type: Sequelize.INTEGER,
          field: "kategori_konten_id",
        },
        kategoriKontenId: {
          type: Sequelize.INTEGER,
          field: "kategori_konten_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "kategori_konten", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "jenis_lomba",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        nama_lomba: { type: Sequelize.STRING, field: "nama_lomba" },
        sumber: { type: Sequelize.STRING, field: "sumber" },
        desk: { type: Sequelize.STRING(2000), field: "desk" },
        tipe: { type: Sequelize.ENUM("Team", "Individu"), field: "tipe" },
        kategori_lomba_id: {
          type: Sequelize.INTEGER,
          field: "kategori_lomba_id",
        },
        tanggal: { type: Sequelize.STRING, field: "tanggal" },
        gambar: { type: Sequelize.STRING, field: "gambar", allowNull: false },
        kategoriLombaId: {
          type: Sequelize.INTEGER,
          field: "kategori_lomba_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "kategori_lomba", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "bidang_lomba",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        nama_bidang: { type: Sequelize.STRING, field: "nama_bidang" },
        desk: { type: Sequelize.STRING(2000), field: "desk" },
        biaya: { type: Sequelize.STRING, field: "biaya" },
        hadiah: { type: Sequelize.STRING, field: "hadiah" },
        link: { type: Sequelize.STRING, field: "link" },
        file: { type: Sequelize.STRING, field: "file" },
        jenis_lomba_id: { type: Sequelize.INTEGER, field: "jenis_lomba_id" },
        gambar: { type: Sequelize.STRING, field: "gambar", allowNull: false },
        jenisLombaId: {
          type: Sequelize.INTEGER,
          field: "jenis_lomba_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "jenis_lomba", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "tag_lomba",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        tag: { type: Sequelize.STRING, field: "tag" },
        kategori_lomba_id: {
          type: Sequelize.INTEGER,
          field: "kategori_lomba_id",
        },
        kategoriLombaId: {
          type: Sequelize.INTEGER,
          field: "kategori_lomba_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "kategori_lomba", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "tag",
      {
        tag_lomba_id: {
          type: Sequelize.INTEGER,
          unique: "tag_tag_lomba_id_jenis_lomba_id_unique",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "tag_lomba", key: "id" },
          primaryKey: true,
          field: "tag_lomba_id",
        },
        jenis_lomba_id: {
          type: Sequelize.INTEGER,
          unique: "tag_tag_lomba_id_jenis_lomba_id_unique",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "jenis_lomba", key: "id" },
          primaryKey: true,
          field: "jenis_lomba_id",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "mahasiswa",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        nama: { type: Sequelize.STRING, field: "nama" },
        nim: { type: Sequelize.STRING, field: "nim" },
        jurusan: { type: Sequelize.STRING, field: "jurusan" },
        bidang_minat: { type: Sequelize.STRING, field: "bidang_minat" },
        peringkat: { type: Sequelize.STRING, field: "peringkat" },
        jenis_lomba_id: { type: Sequelize.INTEGER, field: "jenis_lomba_id"},
        beritum_id: { type: Sequelize.INTEGER, field: "beritum_id" },
        beritumId: {
          type: Sequelize.INTEGER,
          field: "beritum_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "berita", key: "id" },
          allowNull: true,
        },
        jenislombaId: {
          type: Sequelize.INTEGER,
          field: "jenis_lomba_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "jenis_lomba", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

let rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["artikel", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["berita", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["bidang_lomba", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["jenis_lomba", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["kategori_konten", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["kategori_lomba", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["tag_lomba", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["tag", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["mahasiswa", { transaction }],
  },
];

let pos = 0;
let useTransaction = true;

let execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  let run = (transaction) => {
    let commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      let next = () => {
        if (index < commands.length) {
          let command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
