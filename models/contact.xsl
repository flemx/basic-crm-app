<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<html>
			<head>
 			</head>
			<body>
		
				
				
				<table class="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white customer-table">
      	<tr> 
						<th>Name</th>
						<th>Title</th>
						<th>Account</th>
						<th>Phone</th>
						<th>Email</th>
						
					</tr>
					<xsl:for-each select="contacts/contact">
							<tr>
								<td>
									<xsl:value-of select="Name"/>
								</td>
								<td>
									<xsl:value-of select="Title"/>
								</td>
								<td>
									<xsl:value-of select="Account"/>
								</td>
								<td>
									<xsl:value-of select="Phone"/>
								</td>
								<td>
									<xsl:value-of select="Email"/>
								</td>
							</tr>
					</xsl:for-each>
				</table>
				
				
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>