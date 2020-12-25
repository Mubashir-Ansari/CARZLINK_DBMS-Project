-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2020 at 08:13 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_details`
--

CREATE TABLE `add_details` (
  `add_id` int(11) NOT NULL,
  `v_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `heading` varchar(200) DEFAULT NULL,
  `phone` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `add_details`
--

INSERT INTO `add_details` (`add_id`, `v_id`, `user_id`, `heading`, `phone`) VALUES
(73, 85, 5, 'mint condirion car', 3066484566),
(75, 84, 4, 'Cat for sell', 927931230),
(76, 87, 4, 'Brand new', 3062864466),
(80, 91, 20, 'Recent import', 3062674566),
(81, 92, 23, 'Excellent Condition', 3061812634);

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `name` varchar(30) NOT NULL,
  `phone` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`name`, `phone`, `email`, `address`, `description`) VALUES
('zain', 2147483647, 'zhaider0@gmail.com', 'c129A ', 'i am a good boyy'),
('undefined', 0, 'undefined', 'undefined', 'undefined');

-- --------------------------------------------------------

--
-- Table structure for table `inspection`
--

CREATE TABLE `inspection` (
  `inspect_id` int(11) DEFAULT NULL,
  `worker_id` int(11) DEFAULT NULL,
  `enginee` int(11) DEFAULT NULL,
  `suspension` int(11) DEFAULT NULL,
  `exterior` int(11) DEFAULT NULL,
  `electric` int(11) DEFAULT NULL,
  `brakes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inspection`
--

INSERT INTO `inspection` (`inspect_id`, `worker_id`, `enginee`, `suspension`, `exterior`, `electric`, `brakes`) VALUES
(8, 1053, 9, 10, 10, 9, 10);

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(10) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` int(10) NOT NULL,
  `number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `firstname`, `lastname`, `gender`, `email`, `password`, `number`) VALUES
(1, 'mubashir', 'ansari', 'm', 'mushi@gmail.com', 12345, 0);

-- --------------------------------------------------------

--
-- Table structure for table `schedulee`
--

CREATE TABLE `schedulee` (
  `inspect_id` int(11) NOT NULL,
  `v_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `datee` date DEFAULT NULL,
  `timee` time DEFAULT NULL,
  `payment` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedulee`
--

INSERT INTO `schedulee` (`inspect_id`, `v_id`, `user_id`, `datee`, `timee`, `payment`) VALUES
(5, 87, 4, '2020-12-23', '12:00:00', 'cash'),
(7, 91, 20, '2020-12-24', '20:40:00', 'cash'),
(8, 92, 23, '2020-12-25', '10:00:00', 'cash');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `fullname` varchar(20) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `password`) VALUES
(4, 'xain', 'zain haiderr', '$2b$10$d9/18OqBGHEbbM2KRDHvMeKI.s7WYBVUMTpjH8v2p9w6RSgosrNDy'),
(5, 'zuhair', 'zuhair haider', '$2b$10$nwzezQiBbxioH/8ELX/3j.YLaeIwEuBdWOTgvF6ToM3e05zP41Wrq'),
(20, 'mushi', 'mubashir', '$2b$10$TdMAF/ysuggHmaoBI6UzEuflV83Mxt350Hr.ly9X4knT0oG04Wocy'),
(22, 'abc', 'abbu', '$2b$10$lYh8AWRIjUQsSEDC6IdCQ.65Ts85NMwvgKwKTP4d4fXKQOGD72lJO'),
(23, 'wusat', 'wusatullah', '$2b$10$ZgD6ofM8z.BBfYurAzPUcuCZk6d1YDTb6X8wZ.GfdvQ599l9oeZ06');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `v_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `image` varchar(800) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `make` varchar(30) DEFAULT NULL,
  `model` varchar(30) DEFAULT NULL,
  `yearr` int(11) DEFAULT NULL,
  `fuel` varchar(11) DEFAULT NULL,
  `trans` varchar(30) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `platee` varchar(15) NOT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`v_id`, `user_id`, `image`, `city`, `make`, `model`, `yearr`, `fuel`, `trans`, `color`, `mileage`, `capacity`, `platee`, `price`) VALUES
(84, 4, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', 'lahore', 'suzuki', 'alto', 2020, 'both', 'Manual', 'white', 70, 660, 'nmn-000', 700000),
(85, 5, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', 'Karachi', 'Honda', 'city', 2019, 'petrol', 'Automatic', 'Black', 5000, 13000, 'xxx-000', 1100000),
(87, 4, 'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/large-2479-s-classsaloon.jpg?itok=QTxMln2k', 'Multan', 'audi', 'R8', 2020, 'petrol', 'Automatic', 'Grey', 20, 2300, 'ank-293', 2000000),
(91, 20, 'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/large-2479-s-classsaloon.jpg?itok=QTxMln2k', 'Lahore', 'Toyota', 'Aqua', 2018, 'Petrol', 'Automatic', 'White', 20000, 1500, 'kna-294', 2300000),
(92, 23, 'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/large-2479-s-classsaloon.jpg?itok=QTxMln2k', 'Karachi', 'Toyota', 'Axio', 2016, 'Petrol', 'Automatic', 'Grey', 12780, 1500, 'wus-126', 1950000);

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `worker_id` int(11) NOT NULL,
  `w_name` varchar(30) DEFAULT NULL,
  `pass` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`worker_id`, `w_name`, `pass`) VALUES
(1, 'ali ahmed', 12345),
(1053, 'mubashir', 4566);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_details`
--
ALTER TABLE `add_details`
  ADD PRIMARY KEY (`add_id`),
  ADD KEY `fk_user_id` (`user_id`),
  ADD KEY `fk_v_id` (`v_id`);

--
-- Indexes for table `inspection`
--
ALTER TABLE `inspection`
  ADD KEY `fk_id` (`inspect_id`),
  ADD KEY `fk_wor_id` (`worker_id`);

--
-- Indexes for table `schedulee`
--
ALTER TABLE `schedulee`
  ADD PRIMARY KEY (`inspect_id`),
  ADD KEY `fk_u_id` (`user_id`),
  ADD KEY `fk_vv_id` (`v_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`v_id`),
  ADD UNIQUE KEY `platee` (`platee`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`worker_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_details`
--
ALTER TABLE `add_details`
  MODIFY `add_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `schedulee`
--
ALTER TABLE `schedulee`
  MODIFY `inspect_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `v_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `worker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1054;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `add_details`
--
ALTER TABLE `add_details`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_v_id` FOREIGN KEY (`v_id`) REFERENCES `vehicles` (`v_id`);

--
-- Constraints for table `schedulee`
--
ALTER TABLE `schedulee`
  ADD CONSTRAINT `fk_u_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_vv_id` FOREIGN KEY (`v_id`) REFERENCES `vehicles` (`v_id`);

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
