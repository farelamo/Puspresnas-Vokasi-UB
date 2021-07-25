-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Jul 2021 pada 05.31
-- Versi server: 10.4.20-MariaDB
-- Versi PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `puspresnas`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `artikel`
--

CREATE TABLE `artikel` (
  `id` int(11) NOT NULL,
  `judul` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `isi` text NOT NULL,
  `tanggal` varchar(50) NOT NULL,
  `foto` varchar(50) NOT NULL,
  `id_kategori` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `artikel`
--

INSERT INTO `artikel` (`id`, `judul`, `deskripsi`, `isi`, `tanggal`, `foto`, `id_kategori`) VALUES
(1, 'Dibalik kisah mahasiswa para pejuang kompetisi Gemastik', 'Lorem 1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', 'Lorem 1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2021-04-03', '', 1),
(2, 'Petunjuk Teknis Pelaksanaan PIMNAS ke 34 Tahun 2021', 'Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2021-05-13', '', 1),
(3, 'Jelang Lomba Gemastik 2021, Vokasi UB mengadakan bimbingan lomba rutin', 'Lorem 3 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2021-06-03', '', 1),
(4, 'Pekan Ilmiah Mahasiswa Nasional 2020, Universitas Brawijaya Jadi Juara Kedua', 'Lorem 4 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2021-06-13', '', 4),
(5, 'a', 'v', 'c', '2021-07-16', '5.png', 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `berita`
--

CREATE TABLE `berita` (
  `id` int(11) NOT NULL,
  `judul` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `isi` text NOT NULL,
  `tanggal` varchar(50) NOT NULL,
  `foto` varchar(50) NOT NULL,
  `id_kategori` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `berita`
--

INSERT INTO `berita` (`id`, `judul`, `deskripsi`, `isi`, `tanggal`, `foto`, `id_kategori`) VALUES
(1, 'Raih Juara 2 dalam Lomba Desain Maskot Pariwisata Kota Bogor 2020', 'Lorem 1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', 'Lorem 1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2021-04-03', '1.png', 1),
(2, 'Raih Medali Silver di World Science, Environmental, and Engineering Competition 2021', 'Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2021-05-13', '2.png', 1),
(3, 'Inovasi Mahasiswa UB Sabet Penghargaan di Ipitex 2020', 'Lorem 3 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2021-06-03', '', 1),
(4, 'Riset Vokasi UB untuk Perkembangan Bangsa, Ilmu Pengetahuan, dan Kemanusiaan', 'Lorem 4 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2021-06-13', '4.png', 4),
(5, 'aaa', 'aaa', 'aaa', '2021-07-16', '5.png', 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `bidang_lomba`
--

CREATE TABLE `bidang_lomba` (
  `id` int(11) NOT NULL,
  `nama_bidang` varchar(225) NOT NULL,
  `desk` varchar(2000) NOT NULL,
  `biaya` varchar(225) NOT NULL,
  `hadiah` varchar(225) NOT NULL,
  `link` varchar(2000) NOT NULL,
  `file` varchar(500) NOT NULL,
  `id_jenis` int(11) NOT NULL,
  `gambar` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `bidang_lomba`
--

INSERT INTO `bidang_lomba` (`id`, `nama_bidang`, `desk`, `biaya`, `hadiah`, `link`, `file`, `id_jenis`, `gambar`) VALUES
(16, 'v', 'v', '30000', 'v', 'v', '', 242, ''),
(17, 'a', 'a', '30000', 'a', 'a', '', 262, ''),
(18, 'b', 'b', '20000', 'b', 'b', '', 262, '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jenis_lomba`
--

CREATE TABLE `jenis_lomba` (
  `id` int(11) NOT NULL,
  `nama_lomba` varchar(100) NOT NULL,
  `sumber` varchar(100) NOT NULL,
  `desk` varchar(2000) NOT NULL,
  `tipe` enum('Team','Individu') NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `tanggal` varchar(100) NOT NULL,
  `gambar` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `jenis_lomba`
--

INSERT INTO `jenis_lomba` (`id`, `nama_lomba`, `sumber`, `desk`, `tipe`, `id_kategori`, `tanggal`, `gambar`) VALUES
(238, 'GEMASTIK XIII 2020', 'Gemastik Telkom University', 'Program ini ditujukan untuk meningkatkan kompetensi mahasiswa Indonesia, sehingga mampu mengambil peran sebagai agen perubahan dalam memajukan TIK dan pemanfaatannya, baik ketika masih dalam masa studi maupun kelak sesudah lu', 'Team', 9, '2021-10-20 - 2021-10-23', '238.png'),
(239, 'OLIVIA 2020', 'Institut Teknologi Sepulus November', 'Program ini ditujukan untuk meningkatkan kompetensi mahasiswa Indonesia, sehingga mampu mengambil peran sebagai agen perubahan dalam memajukan TIK dan pemanfaatannya, baik ketika masih dalam masa studi maupun kelak sesudah lu', 'Team', 9, '2021-08-19 - 2021-08-21', '239.png'),
(240, 'MTQ Universitas Brawijaya', 'Universitas Brawijaya', 'Program ini ditujukan untuk meningkatkan kompetensi mahasiswa Indonesia, sehingga mampu mengambil peran sebagai agen perubahan dalam memajukan TIK dan pemanfaatannya, baik ketika masih dalam masa studi maupun kelak sesudah lu', 'Team', 9, '2021-08-17 - 2021-08-20', '240.png'),
(241, 'PKM REKTOR CUP UB', 'Universitas Brawijaya', 'Program ini ditujukan untuk meningkatkan kompetensi mahasiswa Indonesia, sehingga mampu mengambil peran sebagai agen perubahan dalam memajukan TIK dan pemanfaatannya, baik ketika masih dalam masa studi maupun kelak sesudah lu', 'Team', 9, '2021-09-07 - 2021-09-09', '241.png'),
(242, 'PKM 2020', 'Ristekdikti', 'Program ini ditujukan untuk meningkatkan kompetensi mahasiswa Indonesia, sehingga mampu mengambil peran sebagai agen perubahan dalam memajukan TIK dan pemanfaatannya, baik ketika masih dalam masa studi maupun kelak sesudah lu', 'Team', 9, '2021-07-20 - 2021-07-20', '242.png'),
(262, 'Yuyu A', 'aaaa', 'ccc', 'Individu', 9, '2021-07-24 - 2021-07-24', '262.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_konten`
--

CREATE TABLE `kategori_konten` (
  `id` int(11) NOT NULL,
  `kategori` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kategori_konten`
--

INSERT INTO `kategori_konten` (`id`, `kategori`) VALUES
(1, 'Info Vokasi'),
(2, 'Info Lomba'),
(3, 'Tips & Trick'),
(4, 'Vokasi Juara');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_lomba`
--

CREATE TABLE `kategori_lomba` (
  `id` int(11) NOT NULL,
  `kategori` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kategori_lomba`
--

INSERT INTO `kategori_lomba` (`id`, `kategori`) VALUES
(9, 'Teknologi'),
(11, 'Design'),
(12, 'Wirausaha'),
(13, 'Public Relation'),
(17, 'Nopal jilid 2'),
(18, 'mas Alvin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `id_jenis` int(11) NOT NULL,
  `id_tag_lomba` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tag`
--

INSERT INTO `tag` (`id`, `id_jenis`, `id_tag_lomba`) VALUES
(138, 238, 1),
(139, 238, 2),
(140, 238, 5),
(141, 238, 6),
(142, 238, 7),
(143, 238, 8),
(144, 239, 2),
(145, 239, 6),
(146, 240, 2),
(147, 240, 8),
(148, 241, 1),
(149, 241, 2),
(150, 241, 5),
(151, 241, 6),
(152, 241, 7),
(153, 241, 8),
(154, 242, 1),
(155, 242, 2),
(156, 242, 5),
(157, 242, 6),
(158, 242, 7),
(159, 242, 8),
(280, 262, 1),
(281, 262, 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tag_lomba`
--

CREATE TABLE `tag_lomba` (
  `id` int(11) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `id_kategori_lomba` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tag_lomba`
--

INSERT INTO `tag_lomba` (`id`, `tag`, `id_kategori_lomba`) VALUES
(1, 'Cyber Security                  ', 9),
(2, 'Pemrograman', 9),
(5, 'Game Development', 9),
(6, 'IoT', 9),
(7, 'Data Mining', 9),
(8, 'UI/UX Design', 9),
(11, 'Karya Adobe Ilustrator', 11),
(12, 'Ide Jualan', 12),
(13, 'Speak English Well', 13),
(14, 'Androida', 11),
(15, 'wwww', 11),
(16, '2222', 17),
(17, 'mas fawwaz', 18);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(2) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `level` enum('admin','superadmin') NOT NULL,
  `foto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `nama`, `username`, `password`, `level`, `foto`) VALUES
(1, 'Naufal Ulinnuha', 'naufal', '21232f297a57a5a743894a0e4a801fc3', 'superadmin', '1.png'),
(2, 'Administrator', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', ''),
(3, 'Alice Zuberg', 'alice', '6384e2b2184bcbf58eccf10ca7a6563c', 'superadmin', '3.png'),
(4, 'farelamo', 'farlam', '827ccb0eea8a706c4c34a16891f84e7b', 'admin', '4.png');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `bidang_lomba`
--
ALTER TABLE `bidang_lomba`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_jenis` (`id_jenis`);

--
-- Indeks untuk tabel `jenis_lomba`
--
ALTER TABLE `jenis_lomba`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_lomba` (`id_kategori`);

--
-- Indeks untuk tabel `kategori_konten`
--
ALTER TABLE `kategori_konten`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kategori_lomba`
--
ALTER TABLE `kategori_lomba`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jenis_lomba` (`id_jenis`),
  ADD KEY `id_tag_lomba` (`id_tag_lomba`);

--
-- Indeks untuk tabel `tag_lomba`
--
ALTER TABLE `tag_lomba`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kategori_lomba` (`id_kategori_lomba`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `berita`
--
ALTER TABLE `berita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `bidang_lomba`
--
ALTER TABLE `bidang_lomba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `jenis_lomba`
--
ALTER TABLE `jenis_lomba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=263;

--
-- AUTO_INCREMENT untuk tabel `kategori_konten`
--
ALTER TABLE `kategori_konten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `kategori_lomba`
--
ALTER TABLE `kategori_lomba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=282;

--
-- AUTO_INCREMENT untuk tabel `tag_lomba`
--
ALTER TABLE `tag_lomba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `bidang_lomba`
--
ALTER TABLE `bidang_lomba`
  ADD CONSTRAINT `jenis_bidang` FOREIGN KEY (`id_jenis`) REFERENCES `jenis_lomba` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jenis_lomba`
--
ALTER TABLE `jenis_lomba`
  ADD CONSTRAINT `kategori_lomba` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_lomba` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tag`
--
ALTER TABLE `tag`
  ADD CONSTRAINT `jenis_lomba` FOREIGN KEY (`id_jenis`) REFERENCES `jenis_lomba` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tag_lomba` FOREIGN KEY (`id_tag_lomba`) REFERENCES `tag_lomba` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tag_lomba`
--
ALTER TABLE `tag_lomba`
  ADD CONSTRAINT `kategori_lomba_tag` FOREIGN KEY (`id_kategori_lomba`) REFERENCES `kategori_lomba` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
