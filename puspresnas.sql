-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2021 at 03:20 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.13

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
-- Table structure for table `artikel`
--

CREATE TABLE `artikel` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `isi` varchar(255) DEFAULT NULL,
  `tanggal` varchar(255) DEFAULT NULL,
  `foto` varchar(255) NOT NULL,
  `kategori_konten_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `isi` varchar(2000) DEFAULT NULL,
  `tanggal` varchar(255) DEFAULT NULL,
  `foto` varchar(255) NOT NULL,
  `kategori_konten_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `berita`
--

INSERT INTO `berita` (`id`, `judul`, `deskripsi`, `isi`, `tanggal`, `foto`, `kategori_konten_id`) VALUES
(1, 'Daun Jatuh Tidak Pernah Membenci Angin', 'testing', 'testing', '2021-08-09', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bidang_lomba`
--

CREATE TABLE `bidang_lomba` (
  `id` int(11) NOT NULL,
  `nama_bidang` varchar(255) DEFAULT NULL,
  `desk` varchar(2000) DEFAULT NULL,
  `biaya` varchar(255) DEFAULT NULL,
  `hadiah` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `id_jenis` int(11) DEFAULT NULL,
  `gambar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jenis_lomba`
--

CREATE TABLE `jenis_lomba` (
  `id` int(11) NOT NULL,
  `nama_lomba` varchar(255) DEFAULT NULL,
  `sumber` varchar(255) DEFAULT NULL,
  `desk` varchar(2000) DEFAULT NULL,
  `tipe` varchar(255) DEFAULT NULL,
  `id_kategori` int(11) DEFAULT NULL,
  `tanggal` varchar(255) DEFAULT NULL,
  `gambar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `kategori_konten`
--

CREATE TABLE `kategori_konten` (
  `id` int(11) NOT NULL,
  `kategori` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `kategori_lomba`
--

CREATE TABLE `kategori_lomba` (
  `id` int(11) NOT NULL,
  `kategori` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int(11) NOT NULL,
  `nama` varchar(225) NOT NULL,
  `nim` varchar(225) NOT NULL,
  `jurusan` varchar(225) NOT NULL,
  `bidang_minat` varchar(225) NOT NULL,
  `nama_lomba` varchar(225) NOT NULL,
  `peringkat` varchar(225) NOT NULL,
  `pelaksana` varchar(225) NOT NULL,
  `id_berita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `id_jenis` int(11) DEFAULT NULL,
  `id_tag_lomba` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tag_lomba`
--

CREATE TABLE `tag_lomba` (
  `id` int(11) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `kategori_lomba_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `level` enum('Superadmin','Admin') DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `username`, `password`, `level`, `foto`) VALUES
(1, 'naufal', 'naufal', '21232f297a57a5a743894a0e4a801fc3', 'Superadmin', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_konten_id` (`kategori_konten_id`);

--
-- Indexes for table `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_konten_id` (`kategori_konten_id`);

--
-- Indexes for table `bidang_lomba`
--
ALTER TABLE `bidang_lomba`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jenis_lomba`
--
ALTER TABLE `jenis_lomba`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategori_konten`
--
ALTER TABLE `kategori_konten`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategori_lomba`
--
ALTER TABLE `kategori_lomba`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_berita` (`id_berita`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tag_id_jenis` (`id_jenis`),
  ADD KEY `tag_id_tag_lomba` (`id_tag_lomba`);

--
-- Indexes for table `tag_lomba`
--
ALTER TABLE `tag_lomba`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_lomba_id` (`kategori_lomba_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `berita`
--
ALTER TABLE `berita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bidang_lomba`
--
ALTER TABLE `bidang_lomba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jenis_lomba`
--
ALTER TABLE `jenis_lomba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori_konten`
--
ALTER TABLE `kategori_konten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori_lomba`
--
ALTER TABLE `kategori_lomba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tag_lomba`
--
ALTER TABLE `tag_lomba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `artikel`
--
ALTER TABLE `artikel`
  ADD CONSTRAINT `artikel_ibfk_1` FOREIGN KEY (`kategori_konten_id`) REFERENCES `kategori_konten` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `berita`
--
ALTER TABLE `berita`
  ADD CONSTRAINT `berita_ibfk_1` FOREIGN KEY (`kategori_konten_id`) REFERENCES `kategori_konten` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD CONSTRAINT `mahasiswa_ibfk_1` FOREIGN KEY (`id_berita`) REFERENCES `berita` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tag_lomba`
--
ALTER TABLE `tag_lomba`
  ADD CONSTRAINT `tag_lomba_ibfk_1` FOREIGN KEY (`kategori_lomba_id`) REFERENCES `kategori_lomba` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
