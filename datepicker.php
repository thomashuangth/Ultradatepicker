<html>
	<head>
		<meta charset="utf-8">
		<title>Ultra datepicker</title>
		<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	</head>
	<body>
		<style>
		body {
			background-image: url('background.jpg');
			background-size: 100%;
			font-family: arial, sans-serif;
			width: 1000px;
			margin: auto;
			text-align: center;
			color: #fff;
		}
		h1 {
			margin: 100px 0;
			font-size: 48px;
			text-shadow: 0 0px 10px rgba(0,0,0,.8);
		}
		.datepicker{
			display: inline-block;
			position: relative;
			margin: 100px 100px;
		}
		.calendar {
			transition: all 0.1s ease-in-out;
			float: left;
			position: absolute;
			top: 30px;
			background: rgba(200,200,200,0.3);
			visibility: hidden;
			text-align: center;
			width: 250px;
			padding: 0 10px 10px 10px;
			border: solid #ccc 1px;
			opacity: 0;
			z-index: 999;
		}
		.datechoice {
			color: white;
			margin: 10px 0 ;
		}
		.visible {
			visibility: visible;
			opacity: 1;
		}
		.calendar button {
			color: rgb(200,70,50);
			background: none;
			font-size: 16px;
			width: 20px;
			border: none;
		}
		button:hover {
			cursor: pointer;
		}
		#next
		{
			margin-left: 10px;
			right: 5px;
		}
		#previous
		{
			margin-right: 10px;
			left: 5px;
		}
		select {
			width: 85px;
			border: none;
			background: rgba(200,200,200,0.3);
			color: white;
			font-size: 14px;
			padding: 3px;
			-webkit-appearance: none;
		}
		.generator select {
			width: 100px;
			height: 30px;
			margin: 10px;
		}
		select option {
			color: black;
			border: none;
		}
		input {
			border: solid rgba(200,200,200,0.8) 1px;
			box-shadow: 0 1px 10px rgba(0,0,0,0.5);
			background: rgba(200,200,200,0.3);
			padding: 3px;
			color: white;
		}
		table {
			text-align: center;
			border-collapse: collapse;
			font-size: 14px;
			margin: auto;
			background: rgba(200,200,200,0.3);
		}
		th {
			white-space: nowrap;
			color: rgb(200,70,50);
		}
		td {
			width: 35px;
			height: 30px;
		}
		.selected {
			transition: all 0.1s ease-in-out;
			border-bottom: solid rgb(200,70,50) 3px;
		}
		.hov:hover {
			transition: all 0.1s ease;
			cursor: pointer;
			background: rgba(200,200,200,0.5);
		}
		.description {
			font-size: 14px;
		}
		</style>
		<h1>ULTRA DATEPICKER</h1>
		<div class="generator">
			<form action="">
				<select name="languagechoice">
				</select><br />
				<select name="firstday">
				</select><br />
				<select name="formatdate" >
					<option value="01/01/2000">01/01/2000</option>
					<option value="01-01-2000">01-01-2000</option>
				</select><br />
			</form>
		</div>
		<div class="description">Click or Enter date</div>
		<?php
		echo "FROM : ";
		datepicker();
		echo "TO : ";
		datepicker();
		function datepicker($languagechoice, $firstday, $formatdate)
		{
			?>
			<div class="datepicker">
				<form action="">
					<input class="data" name="dateinput" type="text"/>
				</form>
				<div class="calendar">
					<div class="datechoice">		
						<button><</button>		
						<select name="monthselect">
						</select>
						<select name="yearselect">
						</select>
						<button>></button>	
					</div>
					<table>
						<tr> <!-- Weekday -->
						</tr>
					</table>
				</div>
			</div>
			<?php
		}
		?>
		<script type="text/javascript" src="datepickercustom.js"></script>
	</body>
</html>