<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<html>
			<head>
				<style>
				  table {
				    border-collapse: collapse;
				  }
				  td, th {
				    border: 1px solid #999;
				    padding: 0.5rem;
				    text-align: left;
				  }
				  th {
				    font-weight: bold;
				  }
			  </style>
			</head>
			<body>
				<table>
					<tr>
						<th>gamePrice</th>
						<th>gameGenre</th>
						<th>consoleType</th>
						<th>gameReleaseDate</th>
						<th>numAvailable</th>
						<th>gamePicture</th>
						<th>gameDescription</th>
					</tr>
					<xsl:for-each select="Games/Game">
							<tr>
								<td>
									<xsl:value-of select="gameTitle"/>
								</td>
								<td>
									<xsl:value-of select="gamePrice"/>
								</td>
								<td>
									<xsl:value-of select="gameGenre"/>
								</td>
								<td>
									<xsl:value-of select="consoleType"/>
								</td>
								<td>
									<xsl:value-of select="gameReleaseDate"/>
								</td>
								<td>
									<xsl:value-of select="numAvailable"/>
								</td>
								<td>
									<xsl:value-of select="gamePicture"/>
								</td>
								<td>
									<xsl:value-of select="gameDescription"/>
								</td>
							</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>