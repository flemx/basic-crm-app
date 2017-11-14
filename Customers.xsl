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
				
				
				<table class="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
      	<tr>
						<th>custName</th>
						<th>custPhone</th>
						<th>custEmail</th>
						<th>custOwnedGamed</th>
					</tr>
					<xsl:for-each select="Customers/Customer">
							<tr>
								<td>
									<xsl:value-of select="custName"/>
								</td>
								<td>
									<xsl:value-of select="custPhone"/>
								</td>
								<td>
									<xsl:value-of select="custEmail"/>
								</td>
								<td>
									<xsl:value-of select="custOwnedGamed"/>
								</td>
							</tr>
					</xsl:for-each>
				</table>
				
				
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>